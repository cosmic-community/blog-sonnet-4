(function() {
  // Only run if this page is in an iframe (dashboard preview)
  if (window.self === window.top) {
    return;
  }

  const logs = [];
  const MAX_LOGS = 500;

  // Store original console methods
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };

  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, (key, value) => {
            if (typeof value === 'function') {
              return '[Function]';
            }
            if (value instanceof Error) {
              return value.toString();
            }
            return value;
          }, 2);
        } catch (e) {
          return '[Object]';
        }
      }
      return String(arg);
    }).join(' ');

    const logEntry = {
      timestamp,
      level,
      message,
      url: window.location.href
    };

    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }

    // Send to parent dashboard
    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) {
      // Silently handle postMessage errors
    }
  }

  // Override console methods
  ['log', 'warn', 'error', 'info', 'debug'].forEach(method => {
    console[method] = function() {
      // Call original method
      originalConsole[method].apply(console, arguments);
      
      // Capture for dashboard
      captureLog(method, Array.from(arguments));
    };
  });

  // Capture unhandled errors
  window.addEventListener('error', function(event) {
    captureLog('error', [
      `Uncaught ${event.error?.name || 'Error'}: ${event.error?.message || event.message}`,
      `at ${event.filename}:${event.lineno}:${event.colno}`
    ]);
  });

  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    captureLog('error', [`Unhandled Promise Rejection: ${event.reason}`]);
  });

  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {
      // Silently handle postMessage errors
    }
  }

  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {
      // Silently handle postMessage errors
    }
  }

  // Send ready message when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sendReady);
  } else {
    sendReady();
  }

  // Monitor route changes for SPA navigation
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    setTimeout(sendRouteChange, 0);
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    setTimeout(sendRouteChange, 0);
  };
  
  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);
  
  // Send initial route
  sendRouteChange();
})();
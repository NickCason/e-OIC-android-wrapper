package com.etechgroup.eoic

import android.os.Bundle
import android.webkit.JavascriptInterface
import com.getcapacitor.BridgeActivity

class MainActivity : BridgeActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Expose the wrapper version (compiled in via BuildConfig) to the
        // webview before any script in the page runs. The web side reads
        // this through window.EoicWrapper.getVersion() inside
        // wrapperBridge.js.
        bridge.webView.addJavascriptInterface(
            EoicWrapperInterface(BuildConfig.WRAPPER_VERSION),
            "EoicWrapper"
        )
    }
}

class EoicWrapperInterface(private val version: String) {
    @JavascriptInterface
    fun getVersion(): String = version
}

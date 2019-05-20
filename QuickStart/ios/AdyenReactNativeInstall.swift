import Foundation
import Adyen

@objc class AdyenReactNativeInstall: NSObject {
  @objc(applicationDidOpenUrl:)
  public func applicationDidOpen(_ url: URL) {
    Adyen.applicationDidOpen(url)
  }
}

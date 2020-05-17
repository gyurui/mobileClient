# mobileClient
DMS mobile application for thesis

## Download Modules
From the `mobileClient` directory, run `npm install`
  * This installs the various modules needed into a `node_modules` directory.

## Starting the sample app

iOS
* `react-native run-ios` runs the iOS build in the default simulator.
  * `react-native run-ios --simulator="MySimulatorName"` will run the iOS build using the simulator you specify. 
    * More details on [specifying simulators](https://facebook.github.io/react-native/docs/running-on-simulator-ios.html)
    * List of available simulators: `xcrun simctl list`
    * Example to create your own named simulator for an iPad Air 2 running iOS 11.3: `xcrun simctl create MySimulatorName com.apple.CoreSimulator.SimDeviceType.iPad-Air-2 com.apple.CoreSimulator.SimRuntime.iOS-11-3`
* ⌘-d in the iOS simulator brings up the [React Native debug menu](https://facebook.github.io/react-native/docs/debugging.html).

Android
* Run an AVD (Android Virtual Device) emulator. This could be started via Android Studio (Tools -> AVD Manager) or [the command line](https://developer.android.com/studio/run/emulator-commandline)
* `react-native run-android` runs the Android build
* ⌘-m in the Android emulator brings up the [React Native debug menu](https://facebook.github.io/react-native/docs/debugging.html).


For running on a physical iOS/Android device, [take a look at the docs for the subtleties involved](https://facebook.github.io/react-native/docs/running-on-device).

## Debugging

React Native has some great [debugging documentation](https://facebook.github.io/react-native/docs/debugging.html), it's well worth reading through. A common setup for us is to have the standalone [React Developer Tools](https://github.com/facebook/react-devtools/tree/master/packages/react-devtools) running and the simulator with Live Reload and Hot Reloading turned on.

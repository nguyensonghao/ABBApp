Auth: nguyensonghao974@gmail.com

Password build android: thaibinh1994
=== Get keystore ===
keytool -list -v -keystore c:\users\admin\.android\debug.keystore -alias androiddebugkey -storepass android -keypass android

keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64

Opem cmd and run "ionic serve"

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-release-unsigned.apk alias_name

zipalign -v 4 android-release-unsigned.apk android.apk

keytool -exportcert -alias my_key -keystore my-release-key.keystore | openssl sha1 -binary | openssl base64
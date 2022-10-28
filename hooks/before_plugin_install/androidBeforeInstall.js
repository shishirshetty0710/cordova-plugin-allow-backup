module.exports = function(ctx) {
  var fs = require('fs'),
  path = require('path'),
  xml = require('cordova-common').xmlHelpers;

 var manifestPath = path.join(ctx.opts.projectRoot, 'platforms/android/AndroidManifest.xml');
 var doc = xml.parseElementtreeSync(manifestPath);
 if (doc.getroot().tag !== 'manifest') {
    throw new Error(manifestPath + ' has incorrect root node name (expected "manifest")');
 }

 doc.getroot().find('./application').attrib['android:allowBackup'] = "true";
 doc.getroot().find('./application').attrib['tools:replace']="android:allowBackup" ;

 //write the manifest file
 fs.writeFileSync(manifestPath, doc.write({
    indent: 4
 }), 'utf-8');
};

module.exports = function(ctx) {
  var fs = require('fs'),
  path = require('path'),
  xml = require('cordova-common').xmlHelpers;

 var manifestPath = path.join(ctx.opts.projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');
  
 fs.readFile(manifestPath, 'utf8', function(err, data) {
         if (err) {
            throw new Error('Unable to find AndroidManifest.xml: ' + err);
         }
            let replace = "<manifest ";
            let replace_with = "<manifest xmlns:tools=\"http://schemas.android.com/tools\" ";
            let result = data.replace(replace, replace_with);
            console.log(data);
            fs.writeFile(manifestPath, result, 'utf8', function(err) {
               if (err) throw new Error('Unable to write into AndroidManifest.xml: ' + err);
            });
         
  }); 
  
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

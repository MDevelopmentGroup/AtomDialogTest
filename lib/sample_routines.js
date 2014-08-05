// ------------------------------------------------------------------------------------------------------------------------------
// File:    sample_sync.js
// Date:    28 June 2011
// Author:  Michael Pantaleo
//
// Copyright (c) 2011 InterSystems, Corp. Cambridge, Massachusetts, U.S.A.  All
// rights reserved. Confidential, unpublished property of InterSystems.
//
// Invocation Type: Synchronous
//
// Description:
// This is example code to show how the new Node.js interface works against InterSystems Globals NoSQL Database.
// This example code will demonstrate the use of some of the primitive APIs to set data into Globals, to retrieve
// data from Globals, and to iterate over data in the database.
//
// Prerequisites:
// Follow these instructions to invoke this example:
//    0) Before invoking this file, check to make sure that you have Globals up and running:
//          <root-of-globals-installation>/mgr/globals start
//    1) If you didn't perform this step during the Globals Node.js installation, please place
//       the 'cache.node' file/module, from <root-of-globals-installation>/bin, into the recognized Node.js library
//       path: <root-of-node.js-installation>/lib/node
//       If the 'lib' directory is not in the <root-of-node.js-installation> path, then Node.js may have been configured
//       to create this directory in a different Node tree.  If, for example, the command 'configure --prefix=PREFIX' is
//       performed during the Node.js installation, then the 'lib' directory will be part of the 'PREFIX' tree (If PREFIX
//       is not specified, then it defaults to '/usr/local').  Hence, if '~/local' was specified for PREFIX, then the
//       'cache.node' file/module should be placed in the Node.js library path, which is now located in the following
//       directory path: ~/local/lib/node   (This location usually contains the 'wafadmin' directory)
//    2) From your terminal prompt, set the following two environment variables
//       to the values from your configuration:
//          a) GLOBALS_HOME = <root-of-globals-installation>		( e.g. $ export GLOBALS_HOME="/usr/local/globalsdb" )
//          b) nodeRoot = <root-of-node.js-installation>		( e.g. $ export nodeRoot="/usr/local/node" )
//       NOTE: Do not include trailing forward-slash in the directory path
//    3) This file should be in the following GlobalsDB directory:
//          <root-of-globals-installation>/dev/node.js/samples
//    4) Change to the 'samples' directory referenced in step (3):
//          cd <root-of-globals-installation>/dev/node.js/samples
//    5) Issue the following command to invoke this file:
//          node sample_sync
//
// NOTE: Before any other methods can be called, the cache.node module must be loaded, an instance of the Cach�
//       object created, and the target Globals database must be opened before any data can be accessed.  You can
//       see these steps being performed as the first few operations of this file.
//
// IMPORTANT:  It's advisable not to use the prefix 'gdbISC' when naming your globals, as globals with this prefix are
//             reserved for internal operations, and may be removed or overwritten at any time.
//
// ------------------------------------------------------------------------------------------------------------------------------
//
// Maintenance History: [ XXXnnn (DD MMM YYYY) - Description ]
//
//    MRP766 (10 MAY 2012) - Added new functions 'next_node()' & 'previous_node()' to Node.js Sample Routines
//    MRP765 (10 MAY 2012) - Modify Node.js Samples: Replace Environment Vars - globalsRoot => GLOBALS_HOME
//    MRP760 (01 MAR 2012) - Display Node.js Version & Globals-Node.js Version correctly in all Node.js Sample Files
//
// ------------------------------------------------------------------------------------------------------------------------------

// --- Define Installation Locations ---
var settings = require(__dirname + '/settings.js');

var rootOfGlobalsInstall = settings.GLOBALS_HOME;
var rootOfNodeInstall = settings.NODE_ROOT;
var fullPathToCacheDotNode = settings.CACHE_DOT_NODE_PATH;

// --- First load the 'cache.node' module to interface the Globals Database ---

var globals = require(fullPathToCacheDotNode);

// --- Create an instance of the Globals Cache object ---

var cacheConnect = new globals.Cache();

// --- Display Node.js & Globals-Node.js Interface Version ---

console.log("\n");
console.log('Node.js Version: ' + process.version);

console.log('Globals Version: '+cacheConnect.version());

// --- Display Information 'about' Globals Node.js Interface ---

console.log('Globals About:   '+cacheConnect.about());

// --- Connection Information ---

var pathToGlobalsMGR = rootOfGlobalsInstall + '/mgr';
var userName = '_SYSTEM';
var password = 'SYS';
var namespace = 'USER';

// --- Open a connection to the target Globals Database ---

cacheConnect.open(pathToGlobalsMGR, userName, password, namespace);

// --- Get the Reserved Directory List from the Globals Database ---

var dirList = cacheConnect.global_directory({lo: "gdbISC", hi: "gdbISCzzzzz"}).toString()

// --- Close the connection to the Globals Database after getting the Reserved Directory List ---

cacheConnect.close();


/*
var question = 'Would you like to continue running this sample program? (y/n) => ';

if (dirList != '') {
   var dirArray = dirList.split(',') ;
   var gloNum = 'global';
   if (dirArray.length > 1)
      gloNum = dirArray.length + ' globals';

   console.log('WARNING:\n');
   console.log('The Globals Database contains the following ' + gloNum + ' with a (gdbISC) prefix:\n');
   console.log(dirList+'\n');

   question = 'Are you sure you wish to continue running this sample program? (y/n) => ' ;
   }

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdout.write(question);
process.stdin.on('data', function (yesNo) {
   yesNo = yesNo.charAt(0).toLowerCase() ;

   if (yesNo == 'y') {
      runSample();
      process.exit()
      }
   else if (yesNo == 'n')
           process.exit();

   process.stdout.write(question);
});
 */

// -----------------------------------------------------------------------------------
//                                 Sample Details
// -----------------------------------------------------------------------------------

function runSample() {

// --- First load the 'cache.node' module to interface the Globals Database ---

var globals = require(fullPathToCacheDotNode);

// --- Create an instance of the Globals Cache object ---

var cacheConnect = new globals.Cache();

// --- Connection Information ---

var pathToGlobalsMGR = rootOfGlobalsInstall + '/mgr';
var userName = '_SYSTEM';
var password = 'SYS';
var namespace = 'USER';

// --- Open a connection to the target Globals Database ---

cacheConnect.open(pathToGlobalsMGR, userName, password, namespace);

// --- Get the Version & Build Details after Connecting to Globals Database ---

var version = cacheConnect.version() ;
var verArray = version.split('Globals Version:') ;
var verNumber = 0;
var verBuild = 0;

if (verArray.length > 1) {
   var verString = verArray[1].replace(/ /g,'') ;
   var verArray = verString.split('build')

   if (verArray.length > 1) {
      // --- Original Globals Version Nomenclature: YEAR.build & YEAR build nnn ---

      // Example:
      //    Globals Version: 2012.296
      //    Version String:  20112 build 296

      verNumber = verArray[0] ;
      verBuild = verArray[1] ;
      }
   else {
      // --- Revised Globals Version Nomenclature: YEAR.field-test.sub-ft.build.sub-build ---

      // Example:
      //    Globals Version: 2012.2.0.577.0
      //    Version String:  2012.2.0.577.0

      var verString = verArray[0].replace(/ /g,'') ;
      var verArray = verString.split('.')

      verNumber = verArray[0] ;
      verBuild = verArray[3] ;
      }
   }

// --- Display Node.js, Globals-Node.js Interface & Globals Version ---

console.log("\n");
console.log('Node.js Version: ' + process.version);

console.log('Globals Version: '+cacheConnect.version());


// --- Close the connection to the Globals Database ---

cacheConnect.close();
console.log("\n");
console.log("Closed Connection\n");
console.log("*** The End ***\n");

}

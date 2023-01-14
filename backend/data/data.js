/** LOWDB */
/** NOTE: The code for lowdb v5.0.5 as copied from...
 *  https://github.com/typicode/lowdb
 *  ... is shown in th comment below.
 *
 * Version 5.0.5 is an ES Module which does not support the
 * require() command:
 *
 * > Error [ERR_REQUIRE_ESM]: require() ... is not supported.
 * > Instead change the require ... to a dynamic import() which
 * > is available in all CommonJS modules.
 *
 * So we have two solutions:
 * 1. Convert the entire project to use ES Modules (by adding
 *    { ... "type": "module" ...} to package.json), but this will
 *    force us to make a number of other changes to the boilerplate
 *    created by `npx express-generator <projectName>`. See...
 *    https://www.kindacode.com/article/node-js-how-to-use-import-and-require-in-the-same-file/
 *    ... for details
 * OR
 * 2. Use a dynamic import(), as suggested in the snippet from
 *    the error message quoted above, which means wrapping the
 *    call to import() in an async function, since import()
 *    returns a promise.
 *    This is the solution chosen.
*/

/*
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// File path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')

// Configure lowdb to write to JSONFile
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Read data from JSON file, this will set db.data content
await db.read()

// If db.json doesn't exist, db.data will be null
// Use the code below to set default data
// db.data = db.data || { posts: [] } // For Node < v15.x
db.data ||= { posts: [] }
*/

const path = require('path')
// Using import() (which returns an async promise) inside an
// Immediately Invoked Function Expression (iife)
const db = (async() => {
  const { Low } = await import('lowdb')
  const { JSONFile } = await import('lowdb/node')

  // The following four lines makes one of two assumptions:
  // 1. EITHER: './data/db.json' does not exist (it will be created
  //    when the first db.write() operation is executed)
  // 2. OR: It contains valid JSON data
  // If it EXISTS but DOES NOT contain valid JSON data then the line
  // await db.read() will provoke an error
  const file = path.join(__dirname, './data.json')
  const adapter = new JSONFile(file)
  const db = new Low(adapter)
  
  await db.read()

  db.data ||= { posts: [] }

  return db
})()



module.exports = db
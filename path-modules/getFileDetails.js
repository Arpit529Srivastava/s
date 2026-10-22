const path = require('path');

function getFileDetails(filePath) {
  const directory = path.dirname(filePath);
  const filename = path.basename(filePath);
  const extension = path.extname(filePath);

  return `Directories - ${directory}\nFilename - ${filename}\nExtension - ${extension}`;
}

module.exports = getFileDetails;

if (require.main === module) {
  console.log(getFileDetails('/Users/Refsnes/demo.js'));
}

var expect = require('chai').expect;
const {parse} = require('json-parser')
var main = require('./index.js')


// initial test variables
var fs = require('fs')
const file1 = parse(fs.readFileSync('./mocks/nl_2-channel1.json','utf8'))
const file2 = parse(fs.readFileSync('./mocks/nl_2-channel2.json','utf8'))


// A Test function that tests the existance of an overlap
function overlapTest(mergeTranscript){
  var index=0
  while(index < mergeTranscript.segments.length-1){
      if(mergeTranscript.segments[index].words[mergeTranscript.segments[index].words.length - 1].end > mergeTranscript.segments[index+1].words[0].start ) return false 
      index++
  }
  return true
}


// Test Code
describe('timestamps overlap test', function() {
    // add a test hook
    var resultTranscript = main.mergeTranscripts(file1, file2)
    // test a functionality
    it('should return true if no timestamp overlap', function() {
      // Test for overlaping timestamp
      expect( overlapTest(resultTranscript)).to.be.true;
    })  
})
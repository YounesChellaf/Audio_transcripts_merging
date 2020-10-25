const {parse} = require('json-parser')

// A helper function for pushing the new segment to the mergedTranscript
function  addNewSegment  (transcript,segment,index,speaker)  {
    transcript.segments[index] = {
        "speaker": speaker,
        "words": []
    }
    return transcript.segments[index].words = segment.words

}

// A helper function for adding the shift time difference to avoid overlaping
function  timestampShift (word,shift){ 
    word.start+=shift;
    word.end+=shift
    return word
}




// Function for merging two transcripts and return one mergedTranscript as a result 
function mergeTranscripts (transcript1, transcript2){
    var mergeTranscript = {
      "speakers": [
        transcript1.speakers[0],
        transcript2.speakers[0]
      ],
      "segments": [],
      "highlights": []
    }
    // Initialize transcriptWords arrays for iterating on words of speakers
    var transcriptWords1 = transcript1.segments[0].words
    var transcriptWords2 = transcript2.segments[0].words

    // Initialize SubSegments objects to built segment of words for each speaker before pushing to the mergedTranscript segments
    var subSegment1 = {
      "speaker": transcript1.speakers[0].spkid,
      "words": []
    }
    var subSegment2 = {
      "speaker": transcript1.speakers[0].spkid,
      "words": []
    }
  
    // Initialize the indexes to iteration on transcriptWords arrays 
    var index1 = 0
    var index2 = 0
    var mergeIndex = 0 
    // Initialize shift on 0 in the beginning where there is no overlap 
    var shift = 0




    // @ This algorithm for merging two transcript is based on the standard sort merge arrays in algorithmics,
    // We make a while iteration for both tables (Transcript.segments) with checking the condition of smaller than 
    // Inside the first While, we build a subSegment and when the inferiority condition switch, we push the subSegment
    // into the merge Transcript
   
    

    // Check if one of the transcripts or its segment are empty
    if (transcript1 == {} || transcript1.segments.length == 0 ) return transcript2
    if (transcript2 == {} || transcript2.segments.length == 0 ) return transcript1


    // Start iterating on both segments arrays and building the mergedTranscript
    while (index1< transcriptWords1.length && index2 < transcriptWords2.length ){

      // The second part of the condition is for keeping the structure of the sentence while the speaker still talking 
      if ( transcriptWords1[index1].start < transcriptWords2[index2].start || transcriptWords1[index1-1].end == transcriptWords1[index1].start  )
      {
        // push the created subSegment from transcript 2 (speaker 2)
        if (subSegment2.words.length > 0 ){
        // mergeTranscript.segments.push(subSegment2)
          addNewSegment(mergeTranscript,subSegment2,mergeIndex,"spk2")
          mergeIndex++
          subSegment2.words = []
        }
        // build a subSegment for speaker 1 from Transcript1
        subSegment1.words.push(timestampShift(transcriptWords1[index1],shift))
        index1++

         // check if the there is an overlap timestamp 
        if (transcriptWords1[index1-1].end > transcriptWords2[index2].start)   shift =  (transcriptWords1[index1-1].end  -  transcriptWords2[index2].start)
      }
      // The Else condition with checking second part of the condition to keep the structure of the sentence while the speaker still talking
      else if ( transcriptWords2[index2].start <= transcriptWords1[index1].start  || transcriptWords2[index2-1].end == transcriptWords2[index2].start  )
      {
        // push the created segment from transcript 2 (speaker 2)
        if (subSegment1.words.length > 0 ){
          addNewSegment(mergeTranscript,subSegment1,mergeIndex,"spk1")
          mergeIndex++
          subSegment1.words = []
        }
        // build a segment for speaker 1
        subSegment2.words.push(timestampShift(transcriptWords2[index2],shift))
        index2++
        // check if the there is an overlap timestamp 
        if (transcriptWords2[index2-1].end> transcriptWords1[index1].start)   shift =  (transcriptWords2[index2-1].end  -  transcriptWords1[index1].start)
      }
    }

    // Add the rest of segments from Transcript 1 to the subSegment1 before pushing to the mergedTranscript
    while (index1 < transcriptWords1.length) {
        if(subSegment2.words.length > 0){
          addNewSegment(mergeTranscript,subSegment2,mergeIndex,"spk2")
          mergeIndex++
          subSegment2.words = []
        }
        subSegment1.words.push(timestampShift(transcriptWords1[index1],shift))
        index1++
    }


    // Add the rest of segments from Transcript 2 to the subSegment2 before pushing to the mergedTranscript
    while (index2 < transcriptWords2.length) {
        if(subSegment1.words.length > 0){
          addNewSegment(mergeTranscript,subSegment1,mergeIndex,"spk1")
          mergeIndex++
          subSegment1.words = []
        }
        subSegment2.words.push(timestampShift(transcriptWords2[index2],shift))
        index2++
    }



    // Add the last segment from Transcript 1 to the mergedTranscripts if exist
    if(subSegment1.words.length > 0){
        addNewSegment(mergeTranscript,subSegment1,mergeIndex,"spk1")
        mergeIndex++
        subSegment1.words = []
    }
    // Add the last segment from Transcript 2 to the mergedTranscripts if exist
    else if(subSegment2.words.length > 0){
        addNewSegment(mergeTranscript,subSegment2,mergeIndex,"spk2")
        mergeIndex++
        subSegment2.words = []
    }

    return mergeTranscript
  }



const index = () => {

    fs = require('fs')
    const file1 = parse(fs.readFileSync('./mocks/nl_5-channel1.json','utf8'))
    const file2 = parse(fs.readFileSync('./mocks/nl_5-channel2.json','utf8'))
    var k =mergeTranscripts(file1, file2).segments.length


    //var data = mergeTranscripts(file1, file2)
    //overlapTest(mergeTranscripts(file1, file2))

    var i=0 

    while( i < k){ 
        console.log(mergeTranscripts(file1, file2).segments[i].words.length)
        i++
    }

    console.log(mergeTranscripts(file1, file2).segments[4])

    // fs.writeFile('./result.json', JSON.stringify(data),'utf', (err) => {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log("JSON data is saved.");
    // });
} 

index()

exports.mergeTranscripts = mergeTranscripts 

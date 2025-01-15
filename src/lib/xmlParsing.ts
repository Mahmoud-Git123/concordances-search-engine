import { parseStringPromise } from 'xml2js';

export const parseXML = async (xml: string) => {
    const result = await parseStringPromise(xml);


  const conversations: {text: string; gender: string; age: number}[] = [];

  result.conversation.u.forEach((utterance: any) => {
    const text = utterance._; //  accesses the text of xml
    const gender = utterance.$.gender; // accesses the attributes of text (i.e. gender and age)
    const age = parseInt(utterance.$.age, 10); // parseInt to convert string to number and in base 10

    const conversationObj = {
        text: text,
        gender: gender,
        age: age
    }

    conversations.push(conversationObj);

});

const speakers = Array.from(
    new Set(
      result.conversation.u.map((utterance: any) => ({
        gender: utterance.$.gender, // accesses the attributes of text (i.e. gender and age)
        age: parseInt(utterance.$.age, 10), // parseInt to convert string to number and in base 10
      }))
    )
  );

  // Returning an object containing the conversations and speakers arrays
  return { conversations, speakers };
}
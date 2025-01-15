import { parseStringPromise } from 'xml2js';

export const parseXML = async (xml: string) => {
    const result = await parseStringPromise(xml);


  const conversations: {text: string; gender: string; age: number}[] = [];

  result.conversation.u.forEach((u: any) => {
    const text = u._; //  accesses the text of xml
    const gender = u.$.gender; // accesses the attributes of text (i.e. gender and age)
    const age = parseInt(u.$.age, 10); // parseInt to convert string to number and in base 10

    const conversationObj = {
        text: text,
        gender: gender,
        age: age
    }

    conversations.push(conversationObj);

});

const speakers = Array.from(
    new Set(
      result.conversation.u.map((u: any) => ({
        gender: u.$.gender, // accesses the attributes of text (i.e. gender and age)
        age: parseInt(u.$.age, 10), // parseInt to convert string to number and in base 10
      }))
    )
  );

  // Returning an object containing the conversations and speakers arrays
  return { conversations, speakers };
}
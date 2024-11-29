/**
 * File: llmapi_appscript.js
 * Description: Add this code to your Google Sheets App Script to run commong LLM providers in your Google Sheet.
 * Author: Varun D (varun@thisnameless.com)
 * Date Created: 02 Nov, 2024
 * Last Modified: 29 Nov, 2024
 *
 * Copyright (c) 2024, Nameless Collective
 * Licensed under the MIT License.
 * See LICENSE file for more details.
 */

// Groq API Ref: https://console.groq.com/docs/api-reference#chat-create
function getGroqCompletion(
  system_message,
  userMessage,
  model,
  temperature,
  max_tokens,
  top_p,
  seed
) {
  // Get Groq API Key from Google Sheets API Config Sheet.
  var API_KEY = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("API Config") // Get the "API Config" sheet. If you create your own script. Change this!
    .getRange("B6") // Assuming the API key is in cell B6. If you create your own script. Change this!
    .getValue(); // Get the value of the cell

  var url = "https://api.groq.com/openai/v1/chat/completions";

  // POST request payload for the API
  var payload = {
    messages: [
      {
        role: "system",
        content: system_message,
      },
      {
        role: "user",
        content: userMessage, // Content from the Google Sheet Cell
      },
    ],
    model: model, // Name of the model, see https://console.groq.com/docs/models
    temperature: temperature,
    max_tokens: max_tokens,
    top_p: top_p,
    stream: false, // Apps Script doesn't support streaming
    stop: null,
    seed: seed || Math.floor(Math.random() * 100),
  };

  // Set up the options for the UrlFetchApp.fetch() request
  var options = {
    method: "POST",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + API_KEY, // Authorization with API key
    },
    payload: JSON.stringify(payload), // Convert the payload to JSON
  };

  // Make the API request and extract response from JSON
  try {
    var response = UrlFetchApp.fetch(url, options);
    var jsonResponse = JSON.parse(response.getContentText()); // Parse the response
    return jsonResponse.choices[0].message.content; // Assuming this is the structure of the response
  } catch (error) {
    var _err = error.toString();
    Logger.log("Error: " + error.toString());
    return "Error: Unable to fetch response from Groq: " + _err; // Handle error gracefully
  }
}

/**
   * Calls the Gorq API to get a chat completion from the provided user message.
   *
   * @param {string} system_message The system message for initial agent setup.
   * @param {string} message The message to send to the Gorq API as the user input.
   * @param {string} model The model name to use at Groq (e.g., gemma2-9b-it, llama3-70b-8192, llama3-8b-8192)
   * @param {string} temperature The model temperature (0.5 to 1, anything above 1 can be random)
   * @param {string} max_tokens The max number of tockens to generate (max: 8192, message + response)
   * @param {string} top_p Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.
   * @param {number} seed Groq attempts to return the same response to the same request with an identical seed. If empty, a random seed is used.
  
   * @return {string} The response from the Gorq API's chatbot.
   * @customfunction
   */
function GROQFULL(
  system_message,
  message,
  model,
  temperature,
  max_tokens,
  top_p,
  seed
) {
  return getGroqCompletion(
    system_message,
    message,
    model,
    temperature,
    max_tokens,
    top_p,
    seed
  );
}

/**
   * Simple implimentation of Gorq API to get a chat completion. System Message and Message required. Other details are taken from API_Config sheet.
   *
   * @param {string} system_message The system message for initial agent setup.
   * @param {string} message The message to send to the Gorq API as the user input.
  
   * @return {string} The response from the Gorq API's chatbot.
   * @customfunction
   */
function GROQSIMPLE(system_message, message) {
  var model = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("API Config")
    .getRange("B2") // If you create your own script. Change this!
    .getValue();

  var temperature = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("API Config")
    .getRange("B3") // If you create your own script. Change this!
    .getValue();

  var max_tokens = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("API Config")
    .getRange("B4") // If you create your own script. Change this!
    .getValue();

  var top_p = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("API Config")
    .getRange("B5") // If you create your own script. Change this!
    .getValue();

  return getGroqCompletion(
    system_message,
    message,
    model,
    temperature,
    max_tokens,
    top_p
  );
}

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var g = require('ger');
// Create an Event Store Manager (ESM) that stores events and provides functions to query them
var esm = new g.MemESM()

// Initialize GER with the esm
var ger = new g.GER(esm);

ger.initialize_namespace('tvseries')
   .then( function() {
  return ger.events([
    { 
      namespace: 'tvseries', 
      person: 'ram', 
      action: 'likes', 
      thing: 'mr.robot',
      expires_at: '2020-06-06' 
    },
    { 
      namespace: 'tvseries', 
      person: 'ram', 
      action: 'likes', 
      thing: 'person of interest',
      expires_at: '2020-06-06' 
    },
    { 
      namespace: 'tvseries', 
      person: 'krish', 
      action: 'likes', 
      thing: 'mr.robot',
      expires_at: '2020-06-06' 
    },
  ])
})
.then( function() {
  // What things might alice like?
  return ger.recommendations_for_person('tvseries', 'krish', {actions: {likes: 1}})
})
.then( function(recommendations) {
  console.log("\nRecommendations For 'krish'")
  console.log(JSON.stringify(recommendations,null,2))
})
.then( function() {
  // What things are similar to xmen?
  return ger.recommendations_for_thing('tvseries', 'mr.robot', {actions: {likes: 1}})
})
.then( function(recommendations) {
  console.log("\nRecommendations Like 'mr.robot'")
  console.log(JSON.stringify(recommendations,null,2))
})
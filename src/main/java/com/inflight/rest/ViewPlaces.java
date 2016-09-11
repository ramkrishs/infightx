/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.inflight.rest;
import static com.mongodb.client.model.Filters.eq;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.json.JSONArray;


/**
 *
 * @author Ramakrishnan_sathyav
 */
@Path("locations")
public class ViewPlaces {
    @SuppressWarnings("resource")
    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public String getLocations() {
        
        JSONArray jsonArr = new JSONArray();
        
        MongoClientURI connectionString = new MongoClientURI("mongodb://ramkrish:1234567@ds029446.mlab.com:29446/inflight");
        MongoClient mongoClient = new MongoClient(connectionString);

        MongoDatabase database = mongoClient.getDatabase("inflight");

        MongoCollection<Document> collection = database.getCollection("location");

        MongoCursor<Document> cursor = collection.find().iterator();
        try {
            while (cursor.hasNext()) {
                jsonArr.put(cursor.next());
                
            }
        } finally {
            cursor.close();
        }

        return jsonArr.toString();
    }
}

    

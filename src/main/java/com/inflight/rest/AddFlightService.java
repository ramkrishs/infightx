/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.inflight.rest;
import com.inflight.util.Password;
import static com.mongodb.client.model.Filters.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;


/**
 *
 * @author Ramakrishnan_sathyav
 */
@Path("addflight")
public class AddFlightService {
    @SuppressWarnings("resource")
    @POST
    @Consumes("application/x-www-form-urlencoded")
    @Produces(MediaType.APPLICATION_JSON)
    public String signup(@FormParam("username") String username,@FormParam("confirmCode") String confirmCode, @FormParam("fromLocation") String fromLocation, @FormParam("toLocation") String toLocation) throws Exception {

            MongoClientURI connectionString = new MongoClientURI("mongodb://ramkrish:1234567@ds029446.mlab.com:29446/inflight");
            MongoClient mongoClient = new MongoClient(connectionString);
            String result = "";

            MongoDatabase database = mongoClient.getDatabase("inflight");
            MongoCollection<Document> collection = database.getCollection("location");

            Document doc = collection.find(or(eq("confirmCode", confirmCode), eq("toLocation", toLocation))).first();
            if(doc == null){
                    Document newDoc = new Document("username", username)
                           .append("confirmCode", confirmCode)
                           .append("fromLocation", fromLocation)
                           .append("toLocation", toLocation);

                    collection.insertOne(newDoc);
                    result = "{\"success\": true}";	
                    return result;
            }else{
                    result = "{\"success\": false, \"message\": \"Booking Reference or To Location already exists\"}";
                    return result;
            }
    }
}

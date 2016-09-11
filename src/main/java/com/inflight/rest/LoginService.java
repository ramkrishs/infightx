/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.inflight.rest;
import com.inflight.util.Password;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.eq;
import org.bson.Document;
/**
 *
 * @author Ramakrishnan_sathyav
 */
@Path("login")
public class LoginService {
    @SuppressWarnings("resource")
    @POST
    @Consumes("application/x-www-form-urlencoded")
    @Produces(MediaType.APPLICATION_JSON)
    public String login(@FormParam("username") String username, @FormParam("password") String password) throws Exception {
		
		MongoClientURI connectionString = new MongoClientURI("mongodb://ramkrish:1234567@ds029446.mlab.com:29446/inflight");
		MongoClient mongoClient = new MongoClient(connectionString);
		String result = "";
		
		MongoDatabase database = mongoClient.getDatabase("inflight");
		MongoCollection<Document> collection = database.getCollection("users");
		
		Document doc = collection.find(eq("username", username)).first();
		
		if(doc != null){
			String actualPass = doc.get("password").toString();			
			if(Password.check(password, actualPass)){
				result = "{\"success\": true}";	
				return result;
			}else{
				result = "{\"success\": false, \"message\": \"Invalid Password\"}";
				return result;
			}
		}else{
			result = "{\"success\": false, \"message\": \"Invalid Username\"}";
			return result;			
		}

	}
}

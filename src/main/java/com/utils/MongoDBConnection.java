package com.utils;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import eu.dozd.mongo.MongoMapper;
import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class MongoDBConnection<T> {
    private final MongoCollection<T> mongoCollection;

    public MongoDBConnection(String name, Class<T> tClass) {
        MongoClient mongoClient = new MongoClient(System.getProperty("host_db"), Integer.parseInt(System.getProperty("port_db", "27017")));
        CodecRegistry codecRegistry = CodecRegistries.fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),
                CodecRegistries.fromProviders(MongoMapper.getProviders()));
        MongoDatabase mongoDatabase = mongoClient.getDatabase("english_center_db").withCodecRegistry(codecRegistry);
        mongoCollection = mongoDatabase.getCollection(name, tClass);
    }

    public Optional<List<T>> find(Map<String, Object> query) {
        return Optional.of(mongoCollection.find(new Document(query)).into(new ArrayList<>()));
    }

    public Optional<Long> count(Map<String, Object> query) {
        return Optional.of(mongoCollection.count(new Document(query)));
    }

    public Optional<T> insert(T t) {
        mongoCollection.insertOne(t);
        return Optional.of(t);
    }
}

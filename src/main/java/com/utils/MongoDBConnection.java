package com.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.BasicDBObject;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.*;
import com.utils.enums.MongodbEnum;
import eu.dozd.mongo.MongoMapper;
import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.types.ObjectId;
import org.springframework.util.CollectionUtils;

import java.util.*;

public class MongoDBConnection<T> {
    private final MongoCollection<T> mongoCollection;

    public MongoDBConnection(String name, Class<T> tClass) {
        ConnectionString connectionString = new ConnectionString(MongodbEnum.connection);
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .build();
        MongoClient mongoClient = MongoClients.create(settings);
        CodecRegistry codecRegistry = CodecRegistries.fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),
                CodecRegistries.fromProviders(MongoMapper.getProviders()));
        MongoDatabase database = mongoClient.getDatabase(MongodbEnum.database_name).withCodecRegistry(codecRegistry);
        mongoCollection = database.getCollection(name, tClass);
    }

    public Optional<List<T>> find(Map<String, Object> query) {
        try {
            return Optional.of(mongoCollection.find(new Document(query)).into(new ArrayList<>()));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<T> findOne(Map<String, Object> query) {
        try {
            List<T> list = mongoCollection.find(new Document(query)).skip(0).limit(1).into(new ArrayList<>());
            if (CollectionUtils.isEmpty(list)) {
                return Optional.empty();
            }
            return Optional.of(list.get(0));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<T>> find(Map<String, Object> query, Map<String, Object> sort, Integer page, Integer size) {
        try {
            return Optional.of(mongoCollection.find(new Document(query)).sort(new Document()).skip((page - 1) * size).limit(size).into(new ArrayList<>()));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<T> update(String id, T t) {
        try {
            Document data = this.buildQuerySet(t);
            Map<String, Object> query = new HashMap<>();
            query.put("_id", new ObjectId(id));
            return Optional.ofNullable(mongoCollection.findOneAndUpdate(new Document(query), data));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Boolean> update(Map<String, Object> query, Map<String, Object> data) {
        try {
            return Optional.of(mongoCollection.updateMany(new Document(query), new Document(data)).getModifiedCount() > 0);
        } catch (Exception e) {
            return Optional.of(Boolean.FALSE);
        }
    }

    public Optional<Boolean> delete(String id) {
        try {
            Map<String, Object> query = new HashMap<>();
            query.put("_id", new ObjectId(id));
            query.put("is_deleted", false);
            return Optional.of(mongoCollection.updateMany(new Document(query), new Document("is_deleted", false)).getModifiedCount() > 0);
        } catch (Exception e) {
            return Optional.of(Boolean.FALSE);
        }
    }

    public Optional<Long> count(Map<String, Object> query) {
        try {
            return Optional.of(mongoCollection.count(new Document(query)));
        } catch (Exception e) {
            return Optional.of(0L);
        }
    }

    public Optional<T> insert(T t) {
        mongoCollection.insertOne(t);
        return Optional.of(t);
    }

    public AggregateIterable<Document> aggregate(List<BasicDBObject> basicDBObjects) {
        return mongoCollection.aggregate(new ArrayList<>(basicDBObjects), Document.class).allowDiskUse(true);
    }

    public void drop(Map<String, Object> query) {
        mongoCollection.deleteMany(new Document(query)).getDeletedCount();
    }

    private Document buildQuerySet(T t) {
        TypeReference<HashMap<String, Object>> typeRef = new TypeReference<HashMap<String, Object>>() {
        };
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> data = objectMapper.convertValue(t, typeRef);
        Document queryItem = new Document();
        queryItem.putAll(data);
        Document query = new Document();
        queryItem.remove("_id");
        query.put("$set", queryItem);
        return query;
    }
}

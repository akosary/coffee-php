// To create an "author" collection with the fields "name" (as text) and "country" (as text), you can use the MongoDB command
// db.createCollection("author", { fields: { name: "text", country: "text" } })

// To create a "posts" collection with the fields "title" (as text), "creator" (as an objectId), "created_at" (as a date), and "comments" (as an array with "text" and "author" fields), you can use the MongoDB command
//  db.createCollection("posts", { fields: { title: "text", creator: "objectId", created_at: "date", comments: [{text: "text", author: "text"}] } })

// To add validation for the "author" and "posts" collections, you can use the MongoDB command
//  db.runCommand({ collMod: "author", validator: { $and: [{ name: { $type: "string" } }, { country: { $type: "string" } } ] } }) and
//  db.runCommand({ collMod: "posts", validator: { $and: [{ title: { $type: "string" } }, { creator: { $type: "objectId" } }, { created_at: { $type: "date" } },
//  { comments: {$type:"array"} } ] } })

// To write a script to create 20 posts with random authors, you can use the MongoDB command
//  for (let i = 0; i < 20; i++) {
//   db.posts.insert({ title: "Random Title " + i, creator: ObjectId(), created_at: new Date(), comments:
//   [{text: "Random Comment " + i, author: "Random Author " + i}] })
//   }

// To get posts with their creator info, you can use the MongoDB command
db.posts.aggregate([
  {
    $lookup: {
      from: "author",
      localField: "creator",
      foreignField: "_id",
      as: "author_data",
    },
  },
]);

// To get a specific author with his comments, you can use the MongoDB command
db.posts.aggregate([
  { $match: { "comments.author": "specific author name" } },
  { $unwind: "$comments" },
  { $match: { "comments.author": "specific author name" } },
  { $group: { _id: "$comments.author", comments: { $push: "$comments" } } },
]);

// To get authors from Egypt, you can use the MongoDB command
db.author.find({ country: "Egypt" });

// // To get the author that has the highest number of comments, you can use the MongoDB command
db.posts.aggregate([
  { $unwind: "$comments" },
  { $group: { _id: "$comments.author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 },
]);

// // To get the post that has the max number of comments, you can use the MongoDB command
db.posts.aggregate([
  { $project: { title: 1, num_comments: { $size: "$comments" } } },
  { $sort: { num_comments: -1 } },
  { $limit: 1 },
]);

// // To get the posts whose author is from Egypt, you can use the MongoDB command
//  `db.posts.aggregate([{$lookup:{from

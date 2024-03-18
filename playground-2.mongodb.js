use ("SystemZarzadzaniaHotelem");



//db.numbers.createIndex({num:1})


db.numbers.find({num:{"$gt":43350}}).explain("executionStats")
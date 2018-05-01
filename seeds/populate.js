const createDocument = doc =>
	new Promise((resolve, reject) => {
		doc.save((err) => {
			if (err) {
				console.log("Error",err)
				return reject(err)
			}

			console.log(`${doc.constructor.modelName} created`)
			return resolve(doc)
		})
	})

module.exports = docs => Promise.all(docs.map(doc => createDocument(doc)))

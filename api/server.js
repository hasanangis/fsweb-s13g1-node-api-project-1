// SUNUCUYU BU DOSYAYA KURUN
const express = require("express");
const { find, findById, insert, remove, update, } = require("./users/model");

const server = express();
server.use(express.json());
server.get("/", (req,res) => {
    res.send("Server running as expected...");
});

server.get("/api/users", async (req, res) => {
    try {
        const users = await find();
  
    res.status(200).json(users);
} catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri bulunamadı." });
}
});
    

server.get("/api/users/:id", async (req, res) => {
    const {id} = req.params;

    const user = await findById(id);
    if (!user) {
        res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı." });
    }
    res.status(200).json(user);
});


server.post("/api/users", async (req, res) => {
    try {
    const {bio, name} = req.body;
    if (!bio || !name) {
     res.status(400).json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın." });
    }
    const newUser = await insert({bio: bio, name: name});
    res.status(201).json(newUser);
} catch (error) {
    res
    .status(500)
    .json({ message: "Veritabanına kaydedilirken bir hata oluştu." });
    }
});

server.delete("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const removedUser = await remove(id);
    if (removedUser) {
        res.status(200)
        .json(removedUser);
    } else {
        res.status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı." });
    }
} catch (error) {
    res
    .status(500)
    .json({ message: "Kullanıcı silinemedi." });
}
});


server.put("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { bio, name } = req.body;

    if (!bio || !name) {
         res.status(400)
         .json({ message: "Lütfen güncellenmiş bir name ve bio sağlayın." });
    }

    const updatedUser = await update(id, { bio, name });
    if (updatedUser) {
        res.status(200).json(updatedUser);
    } else {
        res.status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı." });
    }
}catch{
    res.status(500)
    .json({ message: "Kullanıcı bilgileri güncellenemedi." });
}
});

module.exports = server; // SERVERINIZI EXPORT EDİN {}

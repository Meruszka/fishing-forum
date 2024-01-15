db.createUser({
  user: "fishing-admin",
  pwd: "super-secret",
  roles: [
    {
      role: "readWrite",
      db: "fishing-forum",
    },
  ],
});

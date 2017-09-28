"use strict";
var models = require("./../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let profiles = [];
    for (let i = 0; i < 10; i++) {
      var genderString = "male";
      var genderImage = "assets/viking_guy.jpg";
      if (i % 2) {
        genderString = "female";
        genderImage = "assets/viking_girl.jpg";
      }
      profiles.push({
        fname: `Foo${i}`,
        lname: `Bar${i}`,
        age: 20,
        gender: genderString,
        locationDistance: i * 10,
        locationCity: `City${i}`,
        height: 70,
        status: "single",
        pets: ["Dogs", "Cats"],
        aboutMe:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non hendrerit libero. Duis dictum orci purus. Aenean condimentum eu sapien et porta. Fusce consectetur dapibus nulla id tincidunt. Nunc auctor posuere risus ut semper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque consequat vel velit id volutpat. Phasellus ornare nulla vitae tellus lobortis, eu tristique magna sagittis. Phasellus metus dui, pellentesque nec venenatis ac, tristique eu sem. Sed pulvinar diam eget tortor varius, a ultrices justo faucibus. Quisque sit amet enim sollicitudin, feugiat tellus non, vulputate urna. Vestibulum vehicula commodo diam, eget fringilla velit finibus eu. Duis a vulputate nibh.",
        talents:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non hendrerit libero. Duis dictum orci purus. Aenean condimentum eu sapien et porta. Fusce consectetur dapibus nulla id tincidunt. Nunc auctor posuere risus ut semper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque consequat vel velit id volutpat. Phasellus ornare nulla vitae tellus lobortis, eu tristique magna sagittis. Phasellus metus dui, pellentesque nec venenatis ac, tristique eu sem. Sed pulvinar diam eget tortor varius, a ultrices justo faucibus. Quisque sit amet enim sollicitudin, feugiat tellus non, vulputate urna. Vestibulum vehicula commodo diam, eget fringilla velit finibus eu. Duis a vulputate nibh.",
        favoriteThings:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non hendrerit libero. Duis dictum orci purus. Aenean condimentum eu sapien et porta. Fusce consectetur dapibus nulla id tincidunt. Nunc auctor posuere risus ut semper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque consequat vel velit id volutpat. Phasellus ornare nulla vitae tellus lobortis, eu tristique magna sagittis. Phasellus metus dui, pellentesque nec venenatis ac, tristique eu sem. Sed pulvinar diam eget tortor varius, a ultrices justo faucibus. Quisque sit amet enim sollicitudin, feugiat tellus non, vulputate urna. Vestibulum vehicula commodo diam, eget fringilla velit finibus eu. Duis a vulputate nibh.",
        messageMe:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non hendrerit libero. Duis dictum orci purus. Aenean condimentum eu sapien et porta. Fusce consectetur dapibus nulla id tincidunt. Nunc auctor posuere risus ut semper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque consequat vel velit id volutpat. Phasellus ornare nulla vitae tellus lobortis, eu tristique magna sagittis. Phasellus metus dui, pellentesque nec venenatis ac, tristique eu sem. Sed pulvinar diam eget tortor varius, a ultrices justo faucibus. Quisque sit amet enim sollicitudin, feugiat tellus non, vulputate urna. Vestibulum vehicula commodo diam, eget fringilla velit finibus eu. Duis a vulputate nibh.",
        bodyType: "Built like a God",
        kids: i % 3,
        occupation: "Slying opposing Gods",
        lastLogin: new Date(2000 + i + `-12-17T12:22:00`),
        image: genderImage,
        likers: [2, 3, 4],
        viewers: [2, 3, 4],
        userId: i + 1
      });
    }
    return queryInterface.bulkInsert("Profiles", profiles);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Profiles", null, {}, models.Profiles);
  }
};

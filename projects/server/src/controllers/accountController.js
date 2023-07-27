// uploadPic: async (req, res) => {
//     try {
//       if (req.file == undefined) {
//         throw { message: "Image should not be empty" };
//       }
//       const result = await cashier.update(
//         {
//           imgProfile: req.file.filename,
//         },
//         {
//           where: {
//             id: req.user.id,
//           },
//         }
//       );
//       res.status(200).send({ result, message: "Upload success" });
//     } catch (error) {
//       res.status(400).send(error);
//       console.log(error);
//     }
//   },
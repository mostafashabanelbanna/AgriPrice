import React from "react";
import Gallery from "react-grid-gallery";

const NewsImageGallery = () => {
  const IMAGES = [
    {
      src:
        "https://images.ctfassets.net/hrltx12pl8hq/6gefxWFu1cp4cECQE6qpRS/15f4228cb3a2265c990dbaf1304ecea2/shutterstock_1469674187.jpg?fit=fill&w=800&h=400",
      thumbnail:
        "https://images.ctfassets.net/hrltx12pl8hq/6gefxWFu1cp4cECQE6qpRS/15f4228cb3a2265c990dbaf1304ecea2/shutterstock_1469674187.jpg?fit=fill&w=800&h=400",
      thumbnailWidth: 320,
      thumbnailHeight: 174,
      // isSelected: true,
      caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
      // tags: [
      //   { value: "Ocean", title: "Ocean" },
      //   { value: "People", title: "People" },
      // ],
      caption: "Boats (Jeshu John - designerspics.com)",
    },
    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
    },
    {
      src:
        "https://images.ctfassets.net/hrltx12pl8hq/6gefxWFu1cp4cECQE6qpRS/15f4228cb3a2265c990dbaf1304ecea2/shutterstock_1469674187.jpg?fit=fill&w=800&h=400",
      thumbnail:
        "https://images.ctfassets.net/hrltx12pl8hq/6gefxWFu1cp4cECQE6qpRS/15f4228cb3a2265c990dbaf1304ecea2/shutterstock_1469674187.jpg?fit=fill&w=800&h=400",
      thumbnailWidth: 320,
      thumbnailHeight: 174,
      // isSelected: true,
      caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
      // tags: [
      //   { value: "Ocean", title: "Ocean" },
      //   { value: "People", title: "People" },
      // ],
      caption: "Boats (Jeshu John - designerspics.com)",
    },
    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
    },
    {
      src:
        "https://images.ctfassets.net/hrltx12pl8hq/6gefxWFu1cp4cECQE6qpRS/15f4228cb3a2265c990dbaf1304ecea2/shutterstock_1469674187.jpg?fit=fill&w=800&h=400",
      thumbnail:
        "https://images.ctfassets.net/hrltx12pl8hq/6gefxWFu1cp4cECQE6qpRS/15f4228cb3a2265c990dbaf1304ecea2/shutterstock_1469674187.jpg?fit=fill&w=800&h=400",
      thumbnailWidth: 320,
      thumbnailHeight: 174,
      // isSelected: true,
      caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
      // tags: [
      //   { value: "Ocean", title: "Ocean" },
      //   { value: "People", title: "People" },
      // ],
      caption: "Boats (Jeshu John - designerspics.com)",
    },
    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
    },
  ];
  return (
    <Gallery
      images={IMAGES}
      backdropClosesModal={true}
      imageCountSeparator="من"
    />
  );
};

export default NewsImageGallery;

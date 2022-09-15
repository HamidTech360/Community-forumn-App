const toolbarGroupsWithPostImage = [
  [
    {
      id: 1,
      format: "bold",
      type: "mark",
      toolTip: "<Ctrl+b>"
    },
    {
      id: 2,
      format: "italic",
      type: "mark",
      toolTip: "<Ctrl+i>"
    },
    {
      id: 3,
      format: "underline",
      type: "mark",
      toolTip: "<Ctrl+u>"
    }
  ],

  // [
  // {
  //   id: 8,
  //   format: "heading",
  //   type: "mark",
  //   toolTip: "",
  // },
  // ],
  [
    {
      id: 9,
      format: "blockquote",
      type: "block",
      toolTip: "<Ctrl+Shift+> >"
    }
  ],
  [
    {
      id: 10,
      format: "orderedList",
      type: "block",
      toolTip: "<Ctrl+Shift+&>"
    },
    {
      id: 11,
      format: "unorderedList",
      type: "block",
      toolTip: "<Ctrl+Shift+*>"
    }
  ],
  [
    {
      id: 15,
      format: "link",
      type: "link",
      toolTip: ""
    }
  ],
  [
    {
      id: 16,
      format: "postImage",
      type: "embedPostImage",
      toolTip: ""
    }
  ]
];

export default toolbarGroupsWithPostImage;

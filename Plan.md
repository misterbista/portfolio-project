# Core

- favicon
- Full Name
- SEO Description
- SEO Keywords

# Sidebar

- Profile Picture
- Social Media Links

# Home (Landing Page)

- Hero Picture
- Full Name (Reuse from Core)
- Bio

# About

- About Me
- Image
- Keypoints
- Additional info (Optional)

# My journey
- Brief description
- Milestones  // Git flow branch like structure, use 3 icons for each type of milestone
```json
[
  {
    "type": "",  // Academic, Professional, Personal
    "title": "",
    "description": "",
    "start": "",  // Date, Optional, blank means end is provided and milestone is not range type
    "end": "",  // Date, Optional, blank means start is provided and milestone is under progress
    "company": "",  // optional
    "companyLink": "",  // optional
    "department": "",  // optional
    "departmentLink": "",  // optional
    "points": [], // string array
    "partingNote": ""  // optional
    "projects": [],  // collapsible list of hyperlinks to project pages | Not added while creating
    "achievements": [{
      "title": "",
      "description": "",
      "on": ""  // Date, optional
    }],  // collapsible list
    "skills": []  // collapsible list of skills | Not added while creating
  }
]
```

# Projects
```json
[
  {
    "title": "",
    "links": [],  // string[] | auto detect links and add hyperlinks
    "description": "",
    "images": [],
    "keypoints": [{
      "title": "",
      "value": ""  // auto detect links and add hyperlinks
    }],
    "milestone": 0  // choose from existing entries in My Journey | nullable
  }
]
```
# Skills

```json
[
  {
    "title": "",
    "image": "",
    "description": "",
    "associatedMilestones": [],  // choose from existing entries in My Journey
    "associatedProjects": []  // choose from existing entries in Projects | Adding project will automatically add this skill to the milestone associated with the project if it's not already there
  }
]  // show in a circle x/y where x is (the number of total projects + the number of total milestones) and y is (the number of total projects with this skill + the number of total milestones with this skill)    
```

# Testimonials
```json
[
  {
    "from": "",
    "date": "",
    "title": "", // optional
    "department": "",
    "departmentLink": "",
    "company": "",
    "companyLink": "",
    "image": "", // optional
    "text": ""
  }
] 
```

# Gallery
```json
[
  {
    "photo": "",
    "caption":  ""
    "categories": [],
  }
]  // show like file manager in grid view, categories are folders
```


# Downloads
```json
[
  {
    "title": "",
    "icon": "", // optional
    "link": "" // auto detect links and add hyperlinks
  }
]  // show as ... icon dropdown button on sidebar as last menu. Directly show the button if there is only one button
```
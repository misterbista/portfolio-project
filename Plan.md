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

```

# My journey
- Brief description
- Milestones  // Git flow branch like structure, use 3 icons for each type of milestone
```json
[
  {
    "type": "",  // Academic, Professional, Personal
    "title": "",
    "from": "", // Date
    "to": "", // Date
    "department": "",
    "departmentLink": "",
    "company": "",
    "companyLink": "",
    "description": "",
    "points": [], // string array
    "partingNote": "" // optional
    "achievements": [{
      "title": "",
      "description": "",
      "on": "", // Date
    }],  // collapsible list
    "projects": [],  // collapsible list of hyperlinks to project pages | Not added while creating
    "skills": [],  // collapsible list of skills | Not added while creating
  }
]
```

# Projects
```json
[
  {
    "title": "",
    "description": "",
    "images": [],
    "technologies": [],
    "keypoints": [{
      "title": "",
      "value": ""  // auto detect links and add hyperlinks
    }],
    "links": [],  // string[] | auto detect links and add hyperlinks]
    "milestone": 0,  // choose from existing entries in My Journey | nullable
    "skills": []  // Not added while creating
  }
]
```
# Skills  
```json
[
  {
    "title": "",
    "description": "", // optional
    "associatedMilestones": [], // choose from existing entries in My Journey
    "associatedProjects": [], // choose from existing entries in Projects | Adding project will automatically add this skill to the milestone associated with the project if it's not already there
  }
]  // show in a circle x/y where x is (the number of total projects + the number of total milestones) and y is (the number of total projects with this skill + the number of total milestones with this skill)    
```

# Services
```json
[
  {
    "title": "",
    "description": "",  // really short description
    "icon": "",
    "links": [], // string[] | auto detect links and add hyperlinks
  }
]  // show as card grid
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
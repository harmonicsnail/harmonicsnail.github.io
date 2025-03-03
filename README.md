# Henry Stern - Personal Portfolio Website

A personal portfolio website showcasing my skills, projects, and personal interests as an Electronics Engineer with focuses in deep learning, machine learning, and music.

## Features

- Responsive design that works on all devices
- Dedicated sections for professional experience, projects, skills, music, and personal interests
- Interactive audio player for music samples
- Recipe cards with togglable details
- Contact form
- Smooth scrolling and animations

## Technologies Used

- HTML5
- CSS3 (with custom variables and responsive design)
- JavaScript (vanilla JS, no frameworks)
- Font Awesome for icons
- Google Fonts

## Project Structure

```
portfolio-website/
│
├── index.html           # Main HTML file
├── styles.css           # CSS styles
├── script.js            # JavaScript functionality
├── assets/              # Media and resources
│   ├── img/             # Images for the website
│   ├── audio/           # Audio files for the music section
│   └── resume/          # PDF version of resume
└── README.md            # This file
```

## Setup Instructions

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/portfolio-website.git
   ```

2. Navigate to the project directory:
   ```
   cd portfolio-website
   ```

3. Open the project in VSCode:
   ```
   code .
   ```

4. To preview the website locally, you can use an extension like Live Server in VSCode, or simply open the `index.html` file in your browser.

## Customization

### Adding Your Own Images
1. Replace placeholder images in the `/assets/img/` directory with your own images
2. Update the image src attributes in the HTML file

### Adding Audio Files
1. Add your audio files to the `/assets/audio/` directory
2. Update the source paths in the audio elements in the Music section

### Updating Personal Information
1. Edit the text content in `index.html` to reflect your current information
2. Update contact information and links

### Changing the Color Scheme
1. Modify the CSS variables in the `:root` selector in `styles.css`

## Deployment

To deploy this website:

1. Commit all changes to your GitHub repository
2. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Select the main branch as the source
   - Save the changes

The website will be available at `https://yourusername.github.io/portfolio-website/`

## Future Enhancements

- Add a dark mode toggle
- Implement a project filtering system
- Create a blog section
- Add more interactive elements to showcase technical skills

## License

This project is open source and available under the [MIT License](LICENSE).
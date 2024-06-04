# Digital Aid Seattle Admin Template

This template forms the basis for line-of-business web applications.  Frequently, partners need a simple CRUD interface for applications like:
* inventory management
* project/task tracking
* document submittal

The template supports these application types by providing an application shell with common features such as:
* authentication
* dialogs for data entry
* data tables
* form validation
* file uploads
* drag-and-drop
* Excel spreadsheet support

A venture squad will be able to copy this template and modify it to suit their venture's need.

## Dependencies
The template is built with:
* React
* TypeScript
* Material UI
* Vite
* Supabase

## Features
### Application Shell
The responsive shell that provides a toolbar, navbar, and aside. 

### Authentication
The DAS template uses Supabase for user authentication and authorization.  Implementation for Google and Microsoft authentication is provided.

### CRUD
The DAS template uses Supabase for data storage.  It is anticipated that applications requiring RDBMS support would use this.  Examples of lists, dialogs, and forms with validation are available.

### Markdown
The DAS template includes support for displaying Markdown. The typical use-case is to display privacy policies and/or terms and conditions.  The content on the page can be stored as a application resource to allow changes withou redployment.  One consequence of supporting Markdown is not using Tailwind CSS.  Tailwind removes default formatting from HTML components (e.g. h1 renders plainly with default font size and weight). Markdown is implemented with react-markdown.

### File Storage
The DAS template includes an example of uploading, reading, as listing of files in Supabase's storage system.  The use-case for this could include storing documents, like release forms, for an application. The file `src/pages/UploadPage.tsx` is the entry point for the example.

### Maps
The DAS template includes an example mapping page `src/pages/MapPage.tsx`.  Maps were implemented with react-map-gl & maplibre-gl.

### Drag & Drop
The DAS template includes an example of drag-and-drop use. Drag and drop is implemented with @dnd-kit/core and @dnd-kit/sortable.

### Polling
The application shell includes a 10 second timer. The refresh context can be used to refresh components with current data.

```
    const { refresh } = useContext(RefreshContext)

    useEffect(() => {
        // Refresh action
        ticketService.getTickets(NUM_TIX)
            .then((tix) => setTickets(tix))
    }, [refresh])
```

### theming
A base theming added based on primary and secondary color of project logo and branding including a background primary color in main and minimal layout and secondary color for profile / login / 404  buttons.

This base theming could be easily changed for different ventures by changing two following primary and secondary color in src/themes/palette file.

const primaryColor = "#00728f"
const secondaryColor = "#ef3825"

These two colors was used for DAS Admin Template and should be changed for other projects in addition to change logo and Application name in env file

## Deployment
The application is deployed at Google's Firebase as a static website.  GitHub's workflow action adds site secrets to the build before deploying.

## FAQ
### How do I connect to Supabase?
Environment variables for the connecting to Supabase must be added to the hosting platform as well as the `.env.local` file.  Squad members must obtain the supabase url and auth_anon_key for accessing the Supabase project.

### How do I change the menu items?
Contents of the navbar, the drawer of links on the left of the application window, can be modified by changing the contents of `/src/menu-items/index.tsx`.

### How do I change the toolbar items?
Contents of the toolbar, the links at the top the application window and left of the profile button, can be modified by changing the contents of `/src/toolbar-items/index.tsx`. The file `/src/sections/tickets/TicketToolbarItem` contains an example of what can be done with a toolbar item.

### How do I add a page to the application?
Since the template uses `react-router-dom` for application routing, there is no requirement to placement new pages in the `pages` folder.  It is by convention that new pages are placed there.  For the page to be included in the application `src/pages/routes.tsx` must be updated to include the new page.

### Where does the partner logo get changed?
The logo, displayed in the upper left hand of the application window and elsewhere, can be modified in `/src/components/Logo/Logo.tsx`.  The image files should be placed in the `/src/assets/images/` directory.

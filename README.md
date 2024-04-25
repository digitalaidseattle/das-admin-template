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

A venture squad will be able to copy this template and modify it to suit their venture's need.

## Dependencies
The template is built with:
* React
* TypeScript
* Material UI
* Vite
* Supabase

## Modification

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

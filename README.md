# Vistra Documents Management System

A simple document management system built with Next.js, TypeScript, Express, and MySQL.

## Overview

This project implements a document management system that allows users to:
- View a list of documents and folders
- Add new documents 
- Create new folders
- Search across documents and folders

The system consists of a frontend built with Next.js and TypeScript, and a backend API built with Node.js, TypeScript and MySQL.

## Tech Stack

### Frontend
- Next.js for client-side rendering
- TypeScript for type safety
- Material UI for styling and components
- Material UI Data Grid for tabular data display
- React Query for fetching, caching and state management

### Backend
- Node.js with Express
- TypeScript
- MySQL 8 with Sequelize ORM
- Database migration and seeding with umzug 
- RESTful API architecture


## Product Features

- List files and folders in tabular format, folders are sorted to the top level than files
- Add a new folder to the current folder
- Upload multiple files to the current folder
- Search files and folders by name
- Validations:
  - File name must be unique within the folder
  - Folder name must be unique within the parent folder
  - Folder name must not be empty

**Bonus features:** 
- Clicking on folder will go into that folder
- Delete files from the action menu
- Breadcrumbs to go back to the root folder
- Sort by name, and last modified date and time
- Show number of rows per page
- Pagination by page number
- Cached APIs calls with React Query

## Project Structure

This project uses a monorepo architecture managed with pnpm workspaces, allowing multiple packages to coexist in a single repository while maintaining their independence.

### Workspace Configuration
- Uses pnpm workspaces for package management
- Shared dependencies and configurations
- Consistent development environment across packages
- Simplified dependency management through hoisting

### Repository Structure
```
.
├── packages/                       # Workspace packages directory
│   ├── frontend/                   # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/                # Next.js App Router pages
│   │   │   ├── components/
│   │   │   │   ├── core/           # Reusable UI components
│   │   │   │   └── documents/      # Document management components
│   │   │   ├── hooks/              # Custom React hooks
│   │   │   │   ├── useDocuments.ts # Document management
│   │   │   │   ├── useFiles.ts     # File operations
│   │   │   │   └── useFolders.ts   # Folder operations
│   │   │   ├── services/           # API services
│   │   │   └── theme/              # Material UI theme
│   │   └── package.json            # Frontend-specific dependencies
│   │
│   └── backend/                    # Express backend API
│       ├── src/
│       │   ├── models/             # Sequelize models
│       │   ├── routes/             # API routes
│       │   ├── services/           # Business logic
│       │   ├── migrations/         # Database migrations
│       │   └── seeders/            # Database seeders
│       └── package.json            # Backend-specific dependencies
├── package.json                    # Root workspace configuration
└── pnpm-workspace.yaml       # Workspace package definitions
```

### Frontend Component Architecture
```
.
└── MainComponent/
    ├── MainComponent.tsx  # Main component
    ├── SubComponent.ts    # Sub component
    ├── styles.ts          # Styled components
    ├── index.ts           # Public exports
    └── types.ts           # Type definitions
```

#### Core Components
Reusable UI components that follow Material UI design patterns:
- `Button`: Custom styled buttons with variants
- `Dialog`: Modal dialogs for user interactions
- `TextField`: Input fields with validation

#### Document Management Components
Specialized components for document handling:

##### DocumentList
Main component for displaying and managing documents:
- Hierarchical folder navigation
- File and folder operations
- Search functionality
- Grid view with sorting and filtering

###### Sub-components
- `ActionButtons`: Document/folder action menu
- `BreadCrumb`: Folder navigation path
- `CreateFolderDialog`: New folder creation
- `DocumentTable`: Data grid for files/folders
- `ErrorSnackbar`: Error notifications
- `PageHeader`: List header with actions
- `SearchBar`: Search interface
- `UploadFilesDialog`: File upload interface

#### Custom Hooks
React hooks for data management:
- `useDocuments`: Document list state and operations
- `useFiles`: File-specific operations
- `useFolders`: Folder management operations

## Development

1. Prerequisites:

   Using asdf version manager (recommended):
   ```bash
   # Install asdf (if not already installed)
   brew install asdf

   # asdf extra configuration
   # see https://asdf-vm.com/guide/getting-started.html#_2-configure-asdf
   export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"

   # Add required plugins
   asdf plugin add nodejs
   asdf plugin add pnpm

   # Install versions from .tool-versions
   asdf install

   # Set versions globally (optional)
   asdf global nodejs 20.19.0
   asdf global pnpm 10.6.3

   # Start MySQL container -- skip this if you have MySQL installed on your localhost
   # Please note that the port 3307 is set to avoid conflict with local MySQL instance
   docker run -d --name vistra-mysql -p 3307:3306 \
     -e MYSQL_ROOT_PASSWORD=password \
     -e MYSQL_DATABASE=vistra \
     -v mysql_data:/var/lib/mysql \
     -v ./packages/backend/sql:/docker-entrypoint-initdb.d \
     mysql:8

   # To stop the container
   docker stop vistra-mysql && docker rm vistra-mysql
   ```

   Manual installation:
   - Node.js 20.19.0 or compatible
   - pnpm 10.6.3 or compatible
   - MySQL 8.0.36 or compatible

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment:
   - Backend configuration:
     ```bash
     cd packages/backend
     cp env.example .env
     # Update .env with your database credentials if needed
     ```
   - Frontend configuration:
     ```bash
     cd packages/frontend
     cp .env.example .env.local
     # Update API URL if backend is running on a different port
     ```

4. Setup database:

   # Run migrations and seed data
   cd packages/backend
   pnpm run migrate  # Run database migrations
   pnpm run seed    # Populate with sample data
   ```

5. Start development servers:
   ```bash
   # Start backend
   cd packages/backend
   pnpm run dev

   # Start frontend (in new terminal)
   cd packages/frontend
   pnpm run dev
   ```

6. Access the application at `http://localhost:3000`

## API Endpoints

The backend provides RESTful endpoints for:
- Document management - create and delete files
- Folder management - create and list
- Search functionality

## Database Schema

The MySQL database includes tables for:
- Users
- Folders (hierarchical structure)
- Documents/Files

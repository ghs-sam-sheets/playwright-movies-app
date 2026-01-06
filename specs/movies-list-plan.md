# Movies List Feature - Comprehensive Test Plan

## Executive Summary

The Movies List feature is a comprehensive list management system that allows authenticated users to create, edit, and manage custom movie lists. The feature includes functionality for list creation, movie management (add/remove), list customization (image selection), sharing capabilities, and list deletion. The application uses TMDB (The Movie Database) API for movie data and provides a rich, interactive user interface for movie list management.

## Test Implementation Structure

**File:** `tests/movies-list-feature.spec.ts`

```typescript
describe('Movies List Management', () => {
  // All test blocks will be organized within this single describe block
  // Tests will utilize the existing list-test fixture and list-utilities helpers
});
```

## Available Test Utilities

The test implementation should leverage the following existing utilities from `tests/helpers/list-utilities.ts`:

- `createList(page, listName, listDescription)` - Creates a new list with specified name and description
- `addMovie(page, movieName)` - Adds a movie to the current list using search functionality
- `openLists(page, name)` - Navigates to the user's lists section
- `addImageToList(page, movieName)` - Selects an image for the list from available movie backdrops
- `navigateToMovieList(page, name)` - Navigates to a specific movie list by name

The tests should also use the `listTest` fixture from `tests/helpers/list-test.ts` which provides a pre-configured page with a populated movie list for testing.

## Test Scenarios

### 1. List Creation and Management

#### 1.1 Create New Movie List

**Test Block:** `test('should create new movie list successfully', async ({ page }) => { ... })`

**Steps:**

1. Click on User Profile button
2. Click on "Create New List" link
3. Fill in list name: "Test Movie Collection"
4. Fill in list description: "A collection of test movies"
5. Click "Continue" button

**Expected Results:**

- User navigates to add/remove movies page for the new list
- URL contains the new list ID parameter
- Page header displays the list name "Test Movie Collection"

#### 1.2 Edit Existing List Information

**Test Block:** `test('should edit list name and description successfully', async ({ listPage }) => { ... })`

**Steps:**

1. Navigate to "Edit List" page
2. Update list name to "Updated Movie Collection"
3. Update description to "Updated description for test movies"
4. Change privacy setting to "No" (Private)
5. Click "Save" button

**Expected Results:**

- Changes are saved successfully
- Updated information is displayed when navigating back to view list
- List privacy is updated accordingly

### 2. Movie Management

#### 2.1 Add Movies to List

**Test Block:** `test('should add movies to list using search functionality', async ({ listPage }) => { ... })`

**Steps:**

1. Navigate to "Add/Remove Movies" page
2. Clear the search field if needed
3. Search for "Twisters" in the movie search box
4. Click on the "Twisters" movie button when it appears
5. Verify movie appears in the list
6. Search for "The Matrix" (if available in database)
7. Add it to the list if found

**Expected Results:**

- Movies are successfully added to the list
- Movies appear in the movie list with remove buttons
- Search functionality works correctly
- Movie counter updates appropriately

#### 2.2 Remove Movies from List

**Test Block:** `test('should remove movies from list successfully', async ({ listPage }) => { ... })`

**Steps:**

1. Navigate to "Add/Remove Movies" page
2. Ensure search field is empty to avoid overlay issues
3. Click the "Remove" button for the first movie in the list
4. Verify the movie is removed from the list
5. Navigate to "View List" to confirm removal

**Expected Results:**

- Movie is immediately removed from the add/remove page
- Movie no longer appears in the view list page
- List count updates correctly

#### 2.3 Handle Empty Movie Search Results

**Test Block:** `test('should handle empty search results gracefully', async ({ listPage }) => { ... })`

**Steps:**

1. Navigate to "Add/Remove Movies" page
2. Search for a non-existent movie like "NonExistentMovie123"
3. Wait for search results to load

**Expected Results:**

- "No movies found" message is displayed
- No error occurs
- User can continue searching for other movies

### 3. List Visualization and Navigation

#### 3.1 View Movie List with Posters and Ratings

**Test Block:** `test('should display movie list with posters and ratings correctly', async ({ listPage }) => { ... })`

**Steps:**

1. Navigate to "View List" page
2. Verify each movie displays with poster image
3. Verify each movie shows title as heading
4. Verify each movie displays star ratings
5. Click on a movie poster to navigate to movie details

**Expected Results:**

- All movies display with poster images
- Movie titles are clearly visible as headings
- Star ratings are visible for each movie
- Clicking movies navigates to individual movie detail pages
- Movie URLs contain correct movie IDs

#### 3.2 Navigation Between List Actions

**Test Block:** `test('should navigate between all list management pages correctly', async ({ listPage }) => { ... })`

**Steps:**

1. Start on "View List" page
2. Click "Edit" link and verify Edit List page loads
3. Click "Add/Remove Movies" link and verify correct page loads
4. Click "Choose Image" link and verify image selection page loads
5. Click "View List" link to return to main list view

**Expected Results:**

- All navigation links work correctly
- Page headers and content update appropriately
- URL parameters are maintained correctly
- No navigation errors occur

### 4. List Customization

#### 4.1 Choose List Image from Movie Backdrops

**Test Block:** `test('should select and apply list image from movie backdrops', async ({ listPage }) => { ... })`

**Steps:**

1. Navigate to "Choose Image" page
2. Hover over the first movie item to reveal SELECT button
3. Click the SELECT button
4. Verify button text changes to "SELECTED"
5. Navigate back to "My Lists" section
6. Verify the list now has an updated image

**Expected Results:**

- Movie items respond correctly to hover interactions
- SELECT button becomes visible on hover
- Button state changes to SELECTED after clicking
- List image updates in the user's lists overview

#### 4.2 Handle Image Selection with Multiple Movies

**Test Block:** `test('should handle image selection with multiple movies available', async ({ listPage }) => { ... })`

**Steps:**

1. Ensure list has multiple movies
2. Navigate to "Choose Image" page
3. Verify all movies from the list are displayed as image options
4. Hover over different movies to test hover interactions
5. Select an image from the middle or last movie
6. Verify selection works correctly

**Expected Results:**

- All list movies appear as image selection options
- Each movie correctly displays title and backdrop image
- Hover interactions work for all movie items
- Any movie can be selected as the list image

### 5. List Sharing

#### 5.1 Share List URL

**Test Block:** `test('should generate and display shareable list URL', async ({ listPage }) => { ... })`

**Steps:**

1. Navigate to "View List" page
2. Click "Share" button
3. Verify share dialog opens with list title
4. Verify URL field contains the correct list URL
5. Copy URL from the text field
6. Close dialog by pressing Escape key

**Expected Results:**

- Share dialog opens with correct list title
- URL field contains properly formatted list URL with list ID
- URL is selectable/copyable
- Dialog can be closed properly

#### 5.2 Verify Shared List Accessibility

**Test Block:** `test('should verify shared list URL works correctly', async ({ listPage, context }) => { ... })`

**Steps:**

1. Generate share URL using Share button
2. Copy the URL from the share dialog
3. Open a new browser tab/page
4. Navigate directly to the shared URL
5. Verify list content displays correctly

**Expected Results:**

- Shared URL loads successfully
- List content is visible and correctly formatted
- All movies and metadata display properly
- List matches the original list content

### 6. List Deletion

#### 6.1 Delete List with Confirmation

**Test Block:** `test('should delete list with proper confirmation', async ({ listPage }) => { ... })`

**Steps:**

1. Navigate to "Delete List" page
2. Verify confirmation message/prompt appears
3. Confirm deletion action
4. Verify user is redirected appropriately
5. Verify list no longer appears in user's lists

**Expected Results:**

- Deletion requires explicit confirmation
- User receives clear warning about permanent deletion
- After confirmation, list is permanently removed
- User is redirected to appropriate page (My Lists or Home)

### 7. Error Handling and Edge Cases

#### 7.1 Handle Network Errors During Movie Search

**Test Block:** `test('should handle network errors gracefully during movie search', async ({ listPage }) => { ... })`

**Steps:**

1. Navigate to "Add/Remove Movies" page
2. Simulate network conditions or search for movies when API might be slow
3. Verify loading states are handled properly
4. Test search with various special characters

**Expected Results:**

- Loading states are displayed appropriately
- Network errors are handled gracefully
- Search functionality recovers from temporary failures
- Special characters don't break search functionality

#### 7.2 Handle Empty List States

**Test Block:** `test('should handle empty list states appropriately', async ({ page }) => { ... })`

**Steps:**

1. Create a new empty list
2. Navigate to "View List" page
3. Verify empty state message/display
4. Navigate to "Choose Image" page with empty list
5. Verify appropriate messaging for empty list

**Expected Results:**

- Empty lists display appropriate messaging
- No errors occur when viewing empty lists
- Image selection handles empty lists gracefully
- User is guided on how to add movies to empty list

#### 7.3 Validate List Name and Description Constraints

**Test Block:** `test('should validate list creation with invalid inputs', async ({ page }) => { ... })`

**Steps:**

1. Attempt to create list with empty name
2. Attempt to create list with very long name (>100 characters)
3. Attempt to create list with only spaces in name
4. Test special characters in name and description

**Expected Results:**

- Empty names are rejected with appropriate error message
- Very long names are either truncated or rejected
- Whitespace-only names are handled appropriately
- Special characters are either sanitized or handled properly

### 8. Accessibility and User Experience

#### 8.1 Keyboard Navigation Support

**Test Block:** `test('should support keyboard navigation throughout list management', async ({ listPage }) => { ... })`

**Steps:**

1. Navigate through all list management pages using only Tab key
2. Test Enter and Space key interactions on buttons
3. Test Escape key for closing dialogs
4. Verify all interactive elements are keyboard accessible

**Expected Results:**

- All buttons and links are reachable via Tab navigation
- Enter and Space keys work on interactive elements
- Escape key closes modal dialogs
- Focus indicators are visible and clear

#### 8.2 Responsive Design and Mobile Experience

**Test Block:** `test('should work correctly on mobile viewport', async ({ listPage }) => { ... })`

**Steps:**

1. Set viewport to mobile size (375x667)
2. Test all list management functionality
3. Verify touch interactions work correctly
4. Test sharing functionality on mobile

**Expected Results:**

- All functionality works on mobile viewport
- Buttons and links are appropriately sized for touch
- Text and images scale appropriately
- Share dialog works on mobile devices

## Success Criteria

- **Functionality Coverage**: All core list management features work correctly
- **Data Integrity**: Movie additions, removals, and list modifications persist correctly
- **User Experience**: All interactions are intuitive and responsive
- **Error Handling**: Graceful handling of network issues, invalid inputs, and edge cases
- **Cross-browser Compatibility**: Tests pass across different browser configurations
- **Performance**: List operations complete within reasonable time limits
- **Accessibility**: Interface is keyboard navigable and screen-reader friendly

## Assumptions and Prerequisites

- User authentication is handled by the login.setup.ts configuration
- TMDB API connectivity is available for movie search functionality
- Browser supports modern JavaScript and CSS features
- Network connectivity is available for API calls
- Test database is properly seeded with movie data

## Risk Considerations

- **API Dependency**: Tests depend on external TMDB API availability
- **Data Consistency**: Movie search results may vary over time
- **Performance Variability**: Network conditions may affect test reliability
- **Browser Differences**: Some functionality may behave differently across browsers

This test plan provides comprehensive coverage of the Movies List feature while leveraging existing utilities and maintaining maintainable, reliable test automation.

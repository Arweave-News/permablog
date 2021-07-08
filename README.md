# permablog

## Implemented features

Permablog is a pre-alpha project from arweave.news. It currently hosts the list of active arweave.news AMAs, giving the community a way to ask questions to AMA guests, and guests a way to answer - all powered by the blockweave and stored forever!

## WIP features

Permablog will be a way to upload, view, manage and blog posts on the permaweb. Sets and gets HTML files via the Arweave protocol.

* Create new blog post
* View other blog posts associated with your walllet
* Query and parse your post list using graphql in order to display on a separate front end (filter your wallet transactions against `Application-Name: permablog-v1`)

## Missing features

* ArConnect integration
* 'Update' posts  - pass an existing transaction ID to the upload form to attach a `tag` to the new post which references the original post's version.
* 'Delete' a post - perhaps mark as deleted with a tag, then filter away on any front ends
* Image uploads - a way to easily store an image, perhaps by dragging the file into a ...
* WYSIWYG editor instead of raw HTML
* Markdown mode

## Bugs

* ~~Posts in the PostHistory component can display duplicates~~

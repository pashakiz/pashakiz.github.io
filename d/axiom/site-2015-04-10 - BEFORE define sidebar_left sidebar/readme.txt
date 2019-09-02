- specific instructions can be found in most HTML files
- the below instructions apply to all pages

- all custom styles must be stored in css/default.css
- all custom JavaScript code must be stored in js/application.js
- all referenced images must be stored in the images directory (subdirectories can be used if needed)
- all referenced fonts must be stored in the fonts directory (subdirectories can be used if needed)

- if LESS is used, all LESS files must be stored in the less directory and the resulting stylesheet must be css/default.css
- if SASS/SCSS is used, all SASS/SCSS files must be stored in the sass directory and the resulting stylesheet must be css/default.css

- all vendor stylesheets must be combined into css/vendor.css
- all vendor scripts must be combined into js/vendor.js
- when plugins contain custom images or fonts they must be moved to the images or fonts directories and the references updated

- if Bower is used to manage dependencies a bower.json file must be provided
- in this case dependencies can be stored in a bower_components directory, but they will still need to be combined into css/vendor.css and js/vendor.js
- Gulp (preferred) or Grunt can be used to combine dependencies and move vendor images/fonts

- all markup must be valid HTML5
- all styles must be valid CSS3
- there is no need to include the whole header/footer on all pages; including them in full on a single page is enough
- support must be added for content variation (like longer titles or descriptions); care should be taken to ensure dynamic content cannot break the design
- all dynamic images on the following pages must follow the rules on category.html regarding image containers: home, product, blog, brand, brands, categories, category, checkout_basket, galleries, gallery, parent_category, search, wishlist
- product / category boxes should share the same markup on all pages they appear on
- product / category boxes must support big prices (99999.99 or "99999 points") and long titles
- top / bottom pagination and sorting should share the same markup on all pages they appear on

- mandatory markup for link lists
<ul class="...">
	<li>
		<a href="">...</a>
	</li>
</ul>

- mandatory markup for footer social icons:
<a href="" target="_blank">
	<img src="..." alt="">
</a>

import {createElement} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {TextControl} from '@wordpress/components';


function content(attributes) {
	return el(
		'div',
		{},
		[
			el(
				'p',
				{},
				attributes.text
			),
			el(
				'a',
				{
					href: attributes.link
				},
				attributes.linkText
			)
		]
	);
}

/**
 * Every block starts by registering a new block type definition.
 * @see https://wordpress.org/gutenberg/handbook/block-api/
 */
registerBlockType('caldera-learn-basic-blocks/call-to-action-editable', {
	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __('Call To Action Editable'),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
	 */
	category: 'widgets',

	/**
	 * Optional block extended support features.
	 */
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},

	attributes: {
		text: {
			type: 'string',
			source: 'text',
			selector: 'p',
			default: 'Thanks For Reading!'
		},
		linkText: {
			type: 'string',
			source: 'text',
			selector: 'a',
			default: 'Learn More Here.'
		},
		link: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
			default: 'https://joshpress.net'
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#edit
	 *
	 * @param {Object} [props] Properties passed from the editor.
	 * @return {Element}       Element to render.
	 */
	edit: function (props) {
		var attributes = props.attributes;
		if (props.isSelected) {
			/**
			 * Callback when text changes to update attribute
			 * @param newValue
			 */
			function onChangeText(newValue) {
				props.setAttributes({
					text: newValue
				});
			}

			/**
			 * Callback when linkText changes to update attribute
			 * @param newValue
			 */
			function onChangeLinkText(newValue) {
				props.setAttributes({
					linkText: newValue
				});
			}

			/**
			 * Callback when link changes to update attribute
			 * @param newValue
			 */
			function onChangeLink(newValue) {
				props.setAttributes({
					link: newValue
				});
			}

			return el(
				'div',
				{},
				[
					el(
						TextControl,
						{
							label: __('Call To Action Text'),
							value: attributes.text,
							help: 'First Line Of Text',
							onChange: onChangeText
						},
					),
					el(
						TextControl,
						{
							label: __('Link Text'),
							value: attributes.linkText,
							help: 'Second Line Of Text',
							onChange: onChangeLinkText
						},
					),
					el(
						TextControl,
						{
							label: __('Link Url'),
							value: attributes.link,
							type: 'url',
							help: 'The Link For The Second Line Of Text',
							onChange: onChangeLink

						},
					),
				]
			);
		}
		return content(attributes);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into `post_content`.
	 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#save
	 *
	 * @return {Element}       Element to render.
	 */
	save: function (props) {
		return content(props.attributes);
	}
});


/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
/*
export default function Edit() {
	return (
		<p { ...useBlockProps() }>
			{ __(
				'Bloque Categorias Colores – hello from the editor!',
				'bloque-categorias-colores'
			) }
		</p>
	);
}
*/

import { registerBlockType } from '@wordpress/blocks';
import { TextControl, PanelColor, ColorPalette } from '@wordpress/components';
import { select } from '@wordpress/data';

registerBlockType('bloque-categorias-colores/bloque-categorias-colores', {
    title: 'Bloque Categorías Colores',
    icon: 'smiley',
    category: 'common',
    attributes: {
        title: {
            type: 'string',
            default: 'Título predeterminado',
        },
        description: {
            type: 'string',
            default: 'Descripción predeterminada',
        },
    },
    edit: function (props) {
        const { title, description } = props.attributes;

        const categories = select('core').getEntityRecords('taxonomy', 'category');
        const currentPost = select('core/editor').getCurrentPost();
        const currentCategories = currentPost ? currentPost.categories : [];

        const onChangeTitle = (newTitle) => {
            props.setAttributes({ title: newTitle });
        };

        const onChangeDescription = (newDescription) => {
            props.setAttributes({ description: newDescription });
        };

        return (
            <div {...useBlockProps()}>
                <TextControl label="Título" value={title} onChange={onChangeTitle} />
                <TextControl label="Descripción" value={description} onChange={onChangeDescription} />

                {categories && (
                    <PanelColor title="Categoría" colorValue={getCategoryColor(currentCategories)}>
                        <ColorPalette
                            colors={categories.map((category) => ({
                                name: category.name,
                                color: getCategoryColor([category.id]),
                            }))}
                            onChange={(color) => applyCategoryStyle(color, props.clientId)}
                        />
                    </PanelColor>
                )}
            </div>
        );
    },
    save: function () {
        // Guardar contenido aquí
    },
});

function getCategoryColor(categoryIds) {
    // Lógica para obtener el color de la categoría seleccionada
    // ...
}

function applyCategoryStyle(color, clientId) {
    // Lógica para aplicar el estilo de la categoría seleccionada al bloque
    // ...
}

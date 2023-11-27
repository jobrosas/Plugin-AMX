// src/block/index.js
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

import './style.scss';

const BloqueCategoriasColores = ({ attributes, setAttributes }) => {
  const { selectedCategory, title, description } = attributes;

  // Obtén las categorías de los posts usando la API REST de WordPress
  const categorias = useSelect((select) => {
    return select('core').getEntityRecords('taxonomy', 'category', { per_page: -1 });
  }, []);

  console.log('Categorías:', categorias);

  // Maneja la selección de categoría
  const handleCategoryChange = (value) => {
    console.log('Categoría seleccionada:', value);
    setAttributes({ selectedCategory: value });
  };

  console.log('Atributos:', attributes);

  return (
    <>
      <InspectorControls>
        <PanelBody title="Configuración del Bloque">
          {categorias && categorias.length > 0 && (
            <SelectControl
              label="Selecciona una categoría"
              value={selectedCategory}
              options={categorias.map((cat) => ({ label: cat.name, value: cat.slug }))}
              onChange={handleCategoryChange}
            />
          )}
          <TextControl
            label="Título del Bloque"
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />
          <TextControl
            label="Descripción del Bloque"
            value={description}
            onChange={(value) => setAttributes({ description: value })}
          />
        </PanelBody>
      </InspectorControls>
      <BlockControls>
        <div className={`bloque-categorias-colores ${selectedCategory}`}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </BlockControls>
    </>
  );
};

registerBlockType('bloque-categorias-colores/bloque-categorias-colores', {
  title: 'Bloque Categorías Colores',
  icon: 'format-aside',
  category: 'common',
  attributes: {
    selectedCategory: {
      type: 'string',
      default: '', // Default category
    },
    title: {
      type: 'string',
      default: 'Título del Bloque',
    },
    description: {
      type: 'string',
      default: 'Descripción del Bloque',
    },
  },
  edit: BloqueCategoriasColores,
  save: ({ attributes }) => {
    const { selectedCategory, title, description } = attributes;

    return (
      <div className={`bloque-categorias-colores ${selectedCategory}`}>
        <h2>{title}</h2>
        <p>{description}</p>
        {selectedCategory && (
          <a href={`/category/${selectedCategory}`}>Ir a {selectedCategory}</a>
        )}
      </div>
    );
  },
});

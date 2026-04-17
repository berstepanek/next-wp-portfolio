<?php

if ( ! function_exists( 'blank_support' ) ) :
	function blank_support() {

		// Add support for block styles.
		add_theme_support( 'wp-block-styles' );

		// Enqueue editor styles.
		add_editor_style( 'style.css' );
	}

endif;

add_action( 'after_setup_theme', 'blank_support' );

if ( ! function_exists( 'blank_styles' ) ) :

	function blank_styles() {
		// Register theme stylesheet.
		$theme_version = wp_get_theme()->get( 'Version' );

		$version_string = is_string( $theme_version ) ? $theme_version : false;

		$suffix = SCRIPT_DEBUG ? '' : '.min';
		$src    = 'style' . $suffix . '.css';

		wp_enqueue_style(
			'blank-style',
			get_parent_theme_file_uri( $src ),
			array(),
			$version_string
		);
		wp_style_add_data(
			'blank-style',
			'path',
			get_parent_theme_file_path( $src )
		);
	}

endif;

add_action( 'wp_enqueue_scripts', 'blank_styles' );

// Add block patterns.
require get_template_directory() . '/inc/block-patterns.php';


add_action('init', 'create_post_type');
function create_post_type()
{

    // Projects
    register_post_type(
        'projects',
        array(
            'label' => 'projects',
            'show_in_rest' => true,
            'show_in_graphql' => true, 
            'graphql_single_name' => 'Project', 
            'graphql_plural_name' => 'Projects',
            'labels' => array(
                'name' => 'Projects',
                'singular_name' => 'projects',
                'all_items' => 'Afficher les projets',
                'add_new_item' => 'Ajouter un projet',
                'edit_item' => 'Ã‰diter un projet',
                'new_item' => 'CrÃ©er un nouveau projet',
                'view_item' => 'Voir le projet',
                'search_items' => 'Rechercher parmi les projets',
                'not_found' => 'Aucun projet n\'a Ã©tÃ© trouvÃ©e',
                'not_found_in_trash' => 'Il n\'y a pas de projet dans la corbeille'
            ),
            'hierarchical' => false,
            'public' => true,
            'capability_type' => 'post',
            'supports'       => array( 'title','author', 'page-attributes' ),
            'has_archive' => false,
            'rewrite'=> array( 'slug' => 'projects' )
        )
    );


}



?>
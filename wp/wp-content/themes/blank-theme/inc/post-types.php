<?php
declare(strict_types=1);

namespace BlankTheme;

defined('ABSPATH') || exit;

/**
 * Définition d'un Custom Post Type.
 */
final class PostType
{
    private string $key;
    private string $singular;
    private string $plural;
    private bool $feminine;
    private string $slug;
    private string $icon;
    private string $graphqlSingle;
    private string $graphqlPlural;

    /**
     * @param array{key: string, singular: string, plural: string, feminine: bool, slug: string, icon: string, graphql_single: string, graphql_plural: string} $config
     */
    public function __construct(array $config)
    {
        $this->key           = $config['key'];
        $this->singular      = $config['singular'];
        $this->plural        = $config['plural'];
        $this->feminine      = $config['feminine'];
        $this->slug          = $config['slug'];
        $this->icon          = $config['icon'];
        $this->graphqlSingle = $config['graphql_single'];
        $this->graphqlPlural = $config['graphql_plural'];
    }

    /** @return array<string, string> */
    public function labels(): array
    {
        $name = mb_strtolower($this->singular);

        [$article, $new] = $this->feminine ? ['une', 'Nouvelle'] : ['un', 'Nouveau'];

        return [
            'name'               => $this->plural,
            'singular_name'      => $this->singular,
            'menu_name'          => $this->plural,
            'add_new'            => 'Ajouter',
            'add_new_item'       => "Ajouter {$article} {$name}",
            'new_item'           => "{$new} {$name}",
            'edit_item'          => "Modifier {$article} {$name}",
            'view_item'          => "Voir {$article} {$name}",
            'all_items'          => 'Tous les éléments',
            'search_items'       => 'Rechercher',
            'not_found'          => 'Aucun élément trouvé',
            'not_found_in_trash' => 'Aucun élément dans la corbeille',
        ];
    }

    /** @return array<string, mixed> */
    public function args(): array
    {
        return [
            'labels'              => $this->labels(),
            'public'              => true,
            'has_archive'         => true,
            'menu_icon'           => $this->icon,
            'rewrite'             => ['slug' => $this->slug, 'with_front' => false],
            'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'revisions', 'page-attributes'],
            'show_in_rest'        => true, // Gutenberg + REST
            'show_in_graphql'     => true, // WPGraphQL
            'graphql_single_name' => $this->graphqlSingle,
            'graphql_plural_name' => $this->graphqlPlural,
        ];
    }

    public function register(): void
    {
        register_post_type($this->key, $this->args());
    }
}

/** @return PostType[] */
function post_types(): array
{
    return [
         new PostType([
            'key'            => 'projects',
            'singular'       => 'Project',
            'plural'         => 'Projects',
            'feminine'       => false,
            'slug'           => 'projects',
            'icon'           => 'dashicons-groups',
            'graphql_single' => 'project',
            'graphql_plural' => 'projects',
        ]),
        new PostType([
            'key'            => 'members',
            'singular'       => 'Membre',
            'plural'         => 'Membres',
            'feminine'       => false,
            'slug'           => 'membres',
            'icon'           => 'dashicons-groups',
            'graphql_single' => 'member',
            'graphql_plural' => 'members',
        ]),
        new PostType([
            'key'            => 'creations',
            'singular'       => 'Création',
            'plural'         => 'Créations',
            'feminine'       => true,
            'slug'           => 'creations',
            'icon'           => 'dashicons-art',
            'graphql_single' => 'creation',
            'graphql_plural' => 'creations',
        ]),
        new PostType([
            'key'            => 'theatres',
            'singular'       => 'Théâtre',
            'plural'         => 'Théâtres',
            'feminine'       => false,
            'slug'           => 'theatres',
            'icon'           => 'dashicons-building',
            'graphql_single' => 'theatre',
            'graphql_plural' => 'theatres',
        ]),
    ];
}

add_action('init', static function (): void {
    foreach (post_types() as $postType) {
        $postType->register();
    }
});

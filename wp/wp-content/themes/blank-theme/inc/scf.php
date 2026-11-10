<?php
declare(strict_types=1);

defined('ABSPATH') || exit;

/**
 * Secure Custom Fields (SCF) – Local JSON.
 *
 * SCF est un fork d'ACF : il conserve les hooks « acf/... » et les fonctions « acf_*() ».
 * Chaque groupe de champs enregistré dans l'admin est aussi écrit en JSON
 * dans blank-theme/scf-json/ (versionnable avec Git).
 */

function blank_theme_scf_json_dir(): string
{
    return BLANK_THEME_DIR . '/scf-json';
}

// Dossier d'écriture (priorité haute pour passer après d'éventuels autres réglages).
add_filter('acf/settings/save_json', static function (): string {
    $dir = blank_theme_scf_json_dir();

    if (!is_dir($dir)) {
        wp_mkdir_p($dir);
    }

    return $dir;
}, 99);

// Dossier de lecture.
add_filter('acf/settings/load_json', static function (array $paths): array {
    $paths[] = blank_theme_scf_json_dir();
    return $paths;
}, 99);

/**
 * Avertit si SCF n'est pas activé.
 */
add_action('admin_notices', static function (): void {
    if (!current_user_can('manage_options') || function_exists('acf_get_setting')) {
        return;
    }

    echo '<div class="notice notice-warning"><p><strong>Blank Theme :</strong> '
        . 'installe et active l\'extension <em>Secure Custom Fields</em> pour gérer les champs personnalisés.</p></div>';
});

/**
 * Diagnostic affiché sur les écrans de groupes de champs : indique où SCF enregistre,
 * et si le dossier existe / est accessible en écriture.
 */
add_action('admin_notices', static function (): void {
    if (!current_user_can('manage_options') || !function_exists('acf_get_setting')) {
        return;
    }

    $screen = function_exists('get_current_screen') ? get_current_screen() : null;
    if (!$screen || strpos((string) $screen->id, 'acf-field-group') === false) {
        return;
    }

    $savePath = (string) acf_get_setting('save_json');
    $expected = blank_theme_scf_json_dir();
    $problems = [];

    if (untrailingslashit($savePath) !== untrailingslashit($expected)) {
        $problems[] = 'SCF enregistre ailleurs (une autre extension modifie le réglage) : ' . esc_html($savePath);
    }
    if (!is_dir($expected)) {
        $problems[] = 'Le dossier n\'existe pas : ' . esc_html($expected);
    } elseif (!is_writable($expected)) {
        $problems[] = 'Le dossier n\'est pas accessible en écriture : ' . esc_html($expected) . ' (permissions conseillées : 755)';
    }

    if ($problems) {
        echo '<div class="notice notice-error"><p><strong>Blank Theme – SCF JSON :</strong><br>'
            . implode('<br>', $problems) . '</p></div>';
        return;
    }

    $count = count(glob($expected . '/*.json') ?: []);
    echo '<div class="notice notice-success"><p><strong>Blank Theme – SCF JSON :</strong> OK, '
        . esc_html((string) $count) . ' fichier(s) dans <code>' . esc_html($expected) . '</code>. '
        . 'Enregistre un groupe de champs pour créer ou mettre à jour son fichier.</p></div>';
});

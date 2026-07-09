<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateThemeSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('theme_settings', function (Blueprint $table) {
            $table->id();
            $table->string('active_ui')->default('glass'); // glass, modern, classic, etc. (8 UIs)
            
            // Branding & Visuals
            $table->string('primary_color')->default('#3b82f6'); // Tailwind blue-500
            $table->string('secondary_color')->default('#1d4ed8'); // Tailwind blue-700
            $table->string('panel_background_url')->nullable();
            $table->string('login_background_url')->nullable();
            $table->longText('custom_css')->nullable();
            
            // Feature Toggles (Modules)
            $table->boolean('enable_plugin_installer')->default(true);
            $table->boolean('enable_mod_installer')->default(true);
            $table->boolean('enable_hytale_installer')->default(false);
            $table->boolean('enable_player_manager')->default(true);
            $table->boolean('enable_auto_suspension')->default(false);
            $table->boolean('enable_version_changer')->default(true);
            $table->boolean('enable_server_splitter')->default(false);
            $table->boolean('enable_subdomain_manager')->default(true);
            $table->boolean('enable_registration_system')->default(false);
            
            // Extra configurations
            $table->json('mail_templates_config')->nullable();
            $table->json('suspension_rules')->nullable();
            
            $table->timestamps();
        });

        // Insert default settings on migration
        DB::table('theme_settings')->insert([
            'active_ui' => 'glass',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('theme_settings');
    }
}

<?php

namespace Pterodactyl\Http\Controllers\Admin\Theme;

use Illuminate\Http\Request;
use Pterodactyl\Http\Controllers\Controller;
use Pterodactyl\Models\ThemeSetting;

class ThemeSettingsController extends Controller
{
    /**
     * Get current theme settings.
     */
    public function index()
    {
        $settings = ThemeSetting::first() ?? new ThemeSetting();
        return response()->json($settings);
    }

    /**
     * Update theme settings.
     */
    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'active_ui' => 'required|string|in:glass,modern,classic,arix',
            'primary_color' => 'nullable|string',
            'panel_background_url' => 'nullable|url',
            'login_background_url' => 'nullable|url',
            'custom_css' => 'nullable|string',
            'enable_plugin_installer' => 'boolean',
            'enable_version_changer' => 'boolean',
        ]);

        $settings = ThemeSetting::first() ?? new ThemeSetting();
        $settings->fill($validatedData);
        $settings->save();

        return response()->json([
            'success' => true, 
            'message' => 'Theme settings updated successfully', 
            'data' => $settings
        ]);
    }
}

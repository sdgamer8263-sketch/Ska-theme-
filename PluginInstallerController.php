<?php

namespace Pterodactyl\Http\Controllers\Admin\Theme;

use Illuminate\Http\Request;
use Pterodactyl\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class PluginInstallerController extends Controller
{
    /**
     * Fetch plugins from an external API (e.g., Spiget).
     */
    public function search(Request $request)
    {
        $query = $request->input('query', '');
        
        // Example using Spiget API for Spigot plugins
        $response = Http::get("https://api.spiget.org/v2/search/resources/{$query}?field=name&sort=-downloads");
        
        if ($response->successful()) {
            return response()->json($response->json());
        }
        
        return response()->json(['error' => 'Failed to fetch plugins'], 500);
    }

    /**
     * Install a plugin to a specific server.
     */
    public function install(Request $request, $server_id)
    {
        $request->validate([
            'plugin_id' => 'required|numeric',
            'download_url' => 'required|url',
        ]);

        // Logic to download the plugin and move it to the server's /plugins folder
        // This would typically interface with the Daemon/Wings API
        
        return response()->json(['success' => true, 'message' => 'Plugin installation started']);
    }
}

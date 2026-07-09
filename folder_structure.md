# Pterodactyl Theme & Addon Suite - Folder Structure

This structure shows how the theme integrates into the existing Pterodactyl 1.14.x Laravel/React architecture.

```text
/pterodactyl
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Admin/
│   │   │       └── Theme/
│   │   │           ├── ThemeSettingsController.php   # Handles saving/loading admin settings
│   │   │           ├── PluginInstallerController.php # Backend for plugin API connections
│   │   │           └── ... (other module controllers)
│   │   └── Requests/
│   │       └── Admin/
│   │           └── ThemeSettingsRequest.php          # Validation for theme settings
│   └── Models/
│       └── ThemeSetting.php                          # Model for the theme_settings table
│
├── database/
│   └── migrations/
│       └── 2026_07_09_000000_create_theme_settings_table.php # Database migration for settings
│
├── resources/
│   ├── scripts/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   └── theme/
│   │   │   │       ├── ThemeSettingsContainer.tsx    # Main Admin Theme Editor UI
│   │   │   │       ├── ModuleCard.tsx                # Reusable UI component
│   │   │   │       └── ...
│   │   │   └── server/
│   │   │       ├── plugins/
│   │   │       │   └── PluginInstallerContainer.tsx  # Server-side plugin installer UI
│   │   │       └── ...
│   │   ├── theme/
│   │   │   ├── uis/
│   │   │   │   ├── glass/                          # Glass UI components & CSS
│   │   │   │   ├── arix/                           # Arix-style components & CSS
│   │   │   │   └── ... (8 UI folders total)
│   │   │   └── GlobalThemeContext.tsx              # React context to apply selected UI
│   │   └── routers/
│   │       ├── AdminRouter.tsx                     # (Modified) Add Theme Editor routes
│   │       └── ServerRouter.tsx                    # (Modified) Add Plugin/Mod installer routes
│   │
│   └── views/
│       ├── admin/
│       │   └── theme/
│       │       └── index.blade.php                 # Blade view for the theme editor
│       └── templates/
│           └── wrapper.blade.php                   # (Modified) Inject custom CSS/backgrounds
│
├── routes/
│   ├── admin.php                                   # (Modified) Add /admin/theme routes
│   └── api-client.php                              # (Modified) Add client API routes for modules
│
└── public/
    └── themes/
        └── custom/
            ├── backgrounds/                        # Uploaded background images
            └── css/                                # Compiled/Custom injected CSS
```

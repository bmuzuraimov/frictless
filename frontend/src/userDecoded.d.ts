import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $userDecoded: {
        userId: string;
        name: string;
        picture: string;
        locale: string;
        email: string;
        is_ios_connected: boolean;
        is_notion_connected: boolean;
        notion_page_url: string;
        isAuthenticated: boolean;
    };
  }
}

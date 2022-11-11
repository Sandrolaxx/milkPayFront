import { useRouter } from "next/router";
import { useState } from "react";
import { fetchUserData } from "src/utils/restClient";
import { EnumScreens, User } from "src/utils/types";

export function useUserData() {
    const [user, setUser] = useState<User>();
    const [selectedScreen, setSelectedScreen] = useState(EnumScreens.NONE);
    const router = useRouter();

    function changeView(selectedScreen: EnumScreens) {
        setSelectedScreen(selectedScreen);
    }

    function fetchUser() {
        fetchUserData()
            .then(res => {
                setUser(res);

                if (res && !res.acceptTerms) {
                    changeView(EnumScreens.PROFILE);
                } else {
                    changeView(EnumScreens.DASHBOARD);
                }
            })
            .catch(() => router.push("/auth"));
    }

    return { user, setUser, fetchUser, selectedScreen, changeView };
}

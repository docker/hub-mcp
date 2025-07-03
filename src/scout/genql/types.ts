export default {
    "scalars": [
        3,
        5,
        12,
        14,
        17,
        19,
        21,
        22,
        26,
        29,
        31,
        32,
        44,
        53,
        60,
        83,
        90,
        95,
        105,
        115,
        129,
        132,
        139,
        159,
        167,
        173,
        180,
        185,
        193,
        207,
        213,
        220,
        230,
        231,
        235,
        236,
        249,
        250,
        257,
        258,
        274,
        278,
        281,
        283,
        284,
        291,
        341,
        342,
        363,
        367,
        384,
        385,
        386,
        408,
        422,
        429,
        437,
        442,
        445
    ],
    "types": {
        "Query": {
            "imagesByDiffIds": [
                62,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "diffIds": [
                        14,
                        "[ID!]!"
                    ]
                }
            ],
            "imageDetailsByDigest": [
                71,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "digest": [
                        3,
                        "String!"
                    ],
                    "platform": [
                        70,
                        "ImagePlatform!"
                    ],
                    "repository": [
                        3
                    ]
                }
            ],
            "imageDetailsListByDigest": [
                71,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "digest": [
                        3,
                        "String!"
                    ],
                    "repository": [
                        3
                    ]
                }
            ],
            "dhiImageDetailsListByDigest": [
                71,
                {
                    "context": [
                        20
                    ],
                    "digest": [
                        3,
                        "String!"
                    ],
                    "repository": [
                        3
                    ]
                }
            ],
            "imageVulnerabilitiesByDigest": [
                118,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "digest": [
                        3,
                        "String!"
                    ],
                    "query": [
                        119
                    ]
                }
            ],
            "imageSummariesByDigest": [
                225,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "digests": [
                        3,
                        "[String!]!"
                    ],
                    "repository": [
                        160
                    ]
                }
            ],
            "imagePackagesByDigest": [
                78,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "digest": [
                        3,
                        "String!"
                    ],
                    "query": [
                        79
                    ]
                }
            ],
            "imagePackagesForImageCoords": [
                80,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        81,
                        "IpImagePackagesForImageCoordsQuery!"
                    ]
                }
            ],
            "dhiImagePackagesForImageCoords": [
                80,
                {
                    "context": [
                        20
                    ],
                    "query": [
                        81,
                        "IpImagePackagesForImageCoordsQuery!"
                    ]
                }
            ],
            "baseImagesByDigest": [
                15,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "digest": [
                        3,
                        "String!"
                    ]
                }
            ],
            "imageDetectedSecretsByDigest": [
                67,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "digest": [
                        3,
                        "String!"
                    ]
                }
            ],
            "tagRecommendationsByDigest": [
                241,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "repository": [
                        3
                    ],
                    "digest": [
                        3,
                        "String!"
                    ]
                }
            ],
            "tagRecommendationsByDigests": [
                246,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "digests": [
                        3,
                        "[String!]!"
                    ]
                }
            ],
            "tagRecommendationsByRepositoryAndTag": [
                241,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "repository": [
                        3,
                        "String!"
                    ],
                    "tag": [
                        3,
                        "String!"
                    ]
                }
            ],
            "streams": [
                190,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        188
                    ]
                }
            ],
            "streamVulnerabilityReports": [
                233,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        234,
                        "StrVulnerabilityReportsQuery!"
                    ]
                }
            ],
            "allStreamVulnerabilityReports": [
                10,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        9,
                        "AllStrVulnerabilityReportsQuery!"
                    ]
                }
            ],
            "streamImages": [
                187,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        186,
                        "ScStreamImagesQuery!"
                    ]
                }
            ],
            "streamGroupedPackages": [
                177,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        176,
                        "ScStreamGroupedPackagesQuery!"
                    ]
                }
            ],
            "taggedImagesByRepository": [
                195,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        194,
                        "ScTaggedImagesQuery!"
                    ]
                }
            ],
            "baseImagesSummaryByStream": [
                169,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        168,
                        "ScStreamBaseImagesSummaryQuery!"
                    ]
                }
            ],
            "cvesByStream": [
                175,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        174,
                        "ScStreamCVEsQuery!"
                    ]
                }
            ],
            "vulnerabilityDocuments": [
                201,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        200,
                        "ScVEXsQuery!"
                    ]
                }
            ],
            "streamImagesByBaseImage": [
                182,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        181,
                        "ScStreamImagesByBaseImageQuery!"
                    ]
                }
            ],
            "imagesAffectedByCVE": [
                117,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        116,
                        "ScImagesAffectedByCVEQuery!"
                    ]
                }
            ],
            "organizationStatus": [
                125,
                {
                    "context": [
                        20,
                        "Context!"
                    ]
                }
            ],
            "repository": [
                59,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        161,
                        "ScRepositoryQuery!"
                    ]
                }
            ],
            "goalResultsByDigest": [
                130,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        37,
                        "GoalResultsQuery!"
                    ]
                }
            ],
            "goalResultsByDigests": [
                130,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        33,
                        "GoalResultsDigestsQuery!"
                    ]
                }
            ],
            "goalResultsByInitiative": [
                141,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        34,
                        "GoalResultsInitiativeQuery!"
                    ]
                }
            ],
            "goalResults": [
                163,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        36,
                        "GoalResultsPolicyQuery!"
                    ]
                }
            ],
            "goalResultSummaries": [
                144,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        91,
                        "PolicySummaryQuery!"
                    ]
                }
            ],
            "recentCves": [
                151,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        150,
                        "ScRecentCVEsQuery!"
                    ]
                }
            ],
            "user": [
                197
            ],
            "vexStatement": [
                202,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "id": [
                        14,
                        "ID!"
                    ]
                }
            ],
            "vexStatements": [
                212,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        210,
                        "ScVexStatementsQuery!"
                    ]
                }
            ],
            "orgFilters": [
                123,
                {
                    "context": [
                        20,
                        "Context!"
                    ]
                }
            ],
            "serviceStatus": [
                299
            ],
            "namespaceEntitlements": [
                276,
                {
                    "context": [
                        20,
                        "Context!"
                    ]
                }
            ],
            "repoFeatures": [
                288,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "repoName": [
                        3,
                        "String!"
                    ],
                    "hostName": [
                        3
                    ]
                }
            ],
            "reposFeatures": [
                287,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "repoNames": [
                        3,
                        "[String!]!"
                    ],
                    "hostName": [
                        3
                    ]
                }
            ],
            "listEnabledRepos": [
                263,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "integration": [
                        269
                    ]
                }
            ],
            "shouldEnableReposOnPush": [
                302,
                {
                    "context": [
                        20,
                        "Context!"
                    ]
                }
            ],
            "listBlockedRepos": [
                271,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "integration": [
                        269
                    ]
                }
            ],
            "attestations": [
                321,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        320,
                        "MgAttestationsQuery!"
                    ]
                }
            ],
            "dhiAttestations": [
                321,
                {
                    "context": [
                        20
                    ],
                    "query": [
                        320,
                        "MgAttestationsQuery!"
                    ]
                }
            ],
            "attestationsList": [
                318,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        317,
                        "MgAttestationsListQuery!"
                    ]
                }
            ],
            "dhiAttestationsList": [
                318,
                {
                    "context": [
                        20
                    ],
                    "query": [
                        317,
                        "MgAttestationsListQuery!"
                    ]
                }
            ],
            "imagesWithPackage": [
                371,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        370,
                        "PkImagesWithPackageQuery!"
                    ]
                }
            ],
            "streamSummary": [
                388,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        387,
                        "StreamSummaryQuery!"
                    ]
                }
            ],
            "vulnerabilitiesByPackage": [
                253,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "packageUrls": [
                        3,
                        "[String!]!"
                    ],
                    "digest": [
                        3
                    ],
                    "includeExcepted": [
                        12
                    ]
                }
            ],
            "vulnerabilitiesByPackageForImageCoords": [
                397,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        396,
                        "VulnerabilitiesByPackageQuery!"
                    ]
                }
            ],
            "cveSources": [
                381,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        380,
                        "ScCVESourcesQuery!"
                    ]
                }
            ],
            "vulnerabilityExceptions": [
                406,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        404
                    ]
                }
            ],
            "vulnerabilityExceptionsApplicableToImage": [
                406,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        402,
                        "VulnerabilityExceptionsApplicableToImageQuery!"
                    ]
                }
            ],
            "vulnerabilityException": [
                398,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "id": [
                        14,
                        "ID!"
                    ]
                }
            ],
            "dhiRepositories": [
                346,
                {
                    "context": [
                        20
                    ],
                    "query": [
                        344
                    ]
                }
            ],
            "dhiRepositoryDetails": [
                349,
                {
                    "context": [
                        20
                    ],
                    "query": [
                        348,
                        "DhiRepositoryDetailsQuery!"
                    ]
                }
            ],
            "dhiTagDetails": [
                356,
                {
                    "context": [
                        20
                    ],
                    "query": [
                        355,
                        "DhiTagDetailsQuery!"
                    ]
                }
            ],
            "dhiListMirroredRepositories": [
                335,
                {
                    "context": [
                        20,
                        "Context!"
                    ]
                }
            ],
            "dhiGetMirroredRepository": [
                331,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        330,
                        "DhiGetMirroredRepositoryQuery!"
                    ]
                }
            ],
            "dhiGetMirroredRepositoriesBySourceRepository": [
                329,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        328,
                        "DhiGetMirroredRepositoriesBySourceRepositoryQuery!"
                    ]
                }
            ],
            "dhiListMirroringLogs": [
                338,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "query": [
                        337
                    ]
                }
            ],
            "listWebhooks": [
                364,
                {
                    "context": [
                        20,
                        "Context!"
                    ]
                }
            ],
            "getWebhook": [
                407,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "id": [
                        3,
                        "String!"
                    ]
                }
            ],
            "notifications": [
                414
            ],
            "notificationsFeed": [
                411,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "team": [
                        425
                    ]
                }
            ],
            "notificationsPusherChannels": [
                3
            ],
            "userNotificationPreferences": [
                428,
                {
                    "context": [
                        20,
                        "Context!"
                    ]
                }
            ],
            "notificationWebhook": [
                420,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "ID": [
                        3,
                        "String!"
                    ]
                }
            ],
            "notificationWebhooks": [
                420,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "filter": [
                        419
                    ]
                }
            ],
            "rsListRepositories": [
                441,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "input": [
                        440,
                        "rsRepositoryListInput!"
                    ]
                }
            ],
            "rsListRegistries": [
                436,
                {
                    "context": [
                        20,
                        "Context!"
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "Mutation": {
            "indexImage": [
                73,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "image": [
                        72,
                        "IndexImageInput!"
                    ]
                }
            ],
            "addImageToStream": [
                4,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "input": [
                        2,
                        "AddImageToStreamInput!"
                    ]
                }
            ],
            "setStreamImages": [
                229,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "input": [
                        228,
                        "SetStreamImagesInput!"
                    ]
                }
            ],
            "addVulnerabilityException": [
                7,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "input": [
                        6,
                        "AddVulnerabilityExceptionInput!"
                    ]
                }
            ],
            "updateVulnerabilityException": [
                248,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "input": [
                        247,
                        "UpdateVulnerabilityExceptionInput!"
                    ]
                }
            ],
            "removeVulnerabilityException": [
                94,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "input": [
                        93,
                        "RemoveVulnerabilityExceptionInput!"
                    ]
                }
            ],
            "enrollIntoScout": [
                295,
                {
                    "context": [
                        20,
                        "Context!"
                    ]
                }
            ],
            "setRepoVulnerabilityReporting": [
                306,
                {
                    "context": [
                        20
                    ],
                    "reporting": [
                        292,
                        "RepoVulnerabilityReportingInput!"
                    ],
                    "integration": [
                        270
                    ]
                }
            ],
            "setMultiRepoVulnerabilityReporting": [
                307,
                {
                    "context": [
                        20
                    ],
                    "reporting": [
                        275,
                        "MultiRepoVulnerabilityReportingInput!"
                    ],
                    "integration": [
                        270
                    ]
                }
            ],
            "setEnableReposOnPush": [
                301,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "input": [
                        300,
                        "SetEnableReposOnPushInput!"
                    ]
                }
            ],
            "setReposBlocked": [
                259,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "input": [
                        286,
                        "ReposBlockedInput!"
                    ],
                    "integration": [
                        270
                    ]
                }
            ],
            "dhiSetMirroredRepository": [
                352,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "input": [
                        351,
                        "DhiSetMirroredRepositoryInput!"
                    ]
                }
            ],
            "dhiRemoveMirroredRepository": [
                366,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "input": [
                        343,
                        "DhiRemoveMirroredRepositoryInput!"
                    ]
                }
            ],
            "createWebhook": [
                407,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "input": [
                        323,
                        "CreateWebhookInput!"
                    ]
                }
            ],
            "updateWebhook": [
                407,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "input": [
                        390,
                        "UpdateWebhookInput!"
                    ]
                }
            ],
            "deleteWebhook": [
                324,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "id": [
                        3,
                        "String!"
                    ]
                }
            ],
            "testWebhook": [
                389,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "id": [
                        3,
                        "String!"
                    ]
                }
            ],
            "updateNotification": [
                414,
                {
                    "id": [
                        14,
                        "ID!"
                    ],
                    "update": [
                        417,
                        "NotificationUpdateInput!"
                    ]
                }
            ],
            "dismissAllNotifications": [
                12
            ],
            "setUserNotificationPreferences": [
                428,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "input": [
                        427,
                        "UserNotificationPreferencesInput!"
                    ]
                }
            ],
            "addNotificationWebhook": [
                420,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "input": [
                        409,
                        "AddNotificationWebhookInput!"
                    ]
                }
            ],
            "updateNotificationWebhook": [
                420,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "input": [
                        426,
                        "UpdateNotificationWebhookInput!"
                    ]
                }
            ],
            "removeNotificationWebhook": [
                12,
                {
                    "context": [
                        20,
                        "Context!"
                    ],
                    "ID": [
                        3,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "AddImageToStreamInput": {
            "stream": [
                3
            ],
            "image": [
                3
            ],
            "appName": [
                3
            ],
            "platform": [
                70
            ],
            "__typename": [
                3
            ]
        },
        "String": {},
        "AddImageToStreamResult": {
            "status": [
                5
            ],
            "__typename": [
                3
            ]
        },
        "AddImageToStreamStatus": {},
        "AddVulnerabilityExceptionInput": {
            "cveId": [
                3
            ],
            "type": [
                220
            ],
            "justification": [
                207
            ],
            "additionalDetails": [
                3
            ],
            "imageScopes": [
                206
            ],
            "__typename": [
                3
            ]
        },
        "AddVulnerabilityExceptionResult": {
            "exception": [
                214
            ],
            "__typename": [
                3
            ]
        },
        "AllStrVulnerabilityReports": {
            "stream": [
                3
            ],
            "reports": [
                237
            ],
            "__typename": [
                3
            ]
        },
        "AllStrVulnerabilityReportsQuery": {
            "streams": [
                3
            ],
            "summaryType": [
                236
            ],
            "timescale": [
                235
            ],
            "__typename": [
                3
            ]
        },
        "AllStrVulnerabilityReportsResult": {
            "items": [
                8
            ],
            "__typename": [
                3
            ]
        },
        "BaseScPolicy": {
            "definitionName": [
                3
            ],
            "configurationName": [
                3
            ],
            "displayName": [
                3
            ],
            "description": [
                3
            ],
            "evaluated": [
                12
            ],
            "latestDelta": [
                128
            ],
            "remediations": [
                152,
                {
                    "filter": [
                        158,
                        "ScRemediationFilter!"
                    ]
                }
            ],
            "on_ScBooleanPolicy": [
                97
            ],
            "on_ScGenericPolicy": [
                100
            ],
            "on_ScLicencePolicy": [
                121
            ],
            "on_ScVulnerabilityPolicy": [
                223
            ],
            "__typename": [
                3
            ]
        },
        "Boolean": {},
        "BaseScVulnerabilityExceptionSource": {
            "id": [
                14
            ],
            "on_ScVulnerabilityExceptionScoutSource": [
                219
            ],
            "on_ScVulnerabilityExceptionVEXSource": [
                221
            ],
            "__typename": [
                3
            ]
        },
        "ID": {},
        "BiImageLayers": {
            "layerMatches": [
                16
            ],
            "images": [
                42
            ],
            "__typename": [
                3
            ]
        },
        "BiLayerMatch": {
            "layerOrdinal": [
                17
            ],
            "layerDigest": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "Int": {},
        "CommonImage": {
            "digest": [
                14
            ],
            "tags": [
                65
            ],
            "createdAt": [
                3
            ],
            "packageCount": [
                17
            ],
            "dockerFile": [
                45
            ],
            "vulnerabilityReport": [
                66
            ],
            "repository": [
                59
            ],
            "sbomState": [
                95
            ],
            "layerCount": [
                17
            ],
            "platform": [
                58
            ],
            "compressedSize": [
                19
            ],
            "labels": [
                61
            ],
            "mediaType": [
                3
            ],
            "on_IbBaseImage": [
                42
            ],
            "on_IbImage": [
                57
            ],
            "on_ImageWithBaseImage": [
                71
            ],
            "__typename": [
                3
            ]
        },
        "Float": {},
        "Context": {
            "namespace": [
                3
            ],
            "organization": [
                3
            ],
            "teamId": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "CVSSSeverity": {},
        "CVSSVersion": {},
        "DetectedSecret": {
            "source": [
                24
            ],
            "findings": [
                226
            ],
            "__typename": [
                3
            ]
        },
        "DetectedSecretSource": {
            "type": [
                26
            ],
            "location": [
                25
            ],
            "__typename": [
                3
            ]
        },
        "DetectedSecretSourceLocation": {
            "path": [
                3
            ],
            "ordinal": [
                17
            ],
            "digest": [
                3
            ],
            "diffId": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DetectedSecretSourceType": {},
        "DockerfileLine": {
            "number": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "DockerOrg": {
            "name": [
                3
            ],
            "role": [
                29
            ],
            "avatarUrl": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DockerRole": {},
        "EPSS": {
            "score": [
                19
            ],
            "percentile": [
                19
            ],
            "priority": [
                31
            ],
            "priorityDescription": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "EPSSPriorityCategory": {},
        "ExceptionType": {},
        "GoalResultsDigestsQuery": {
            "digests": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "GoalResultsInitiativeQuery": {
            "initiative": [
                3
            ],
            "stream": [
                3
            ],
            "paging": [
                87
            ],
            "filter": [
                35
            ],
            "deltaTimestamp": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "GoalResultsInitiativeQueryFilter": {
            "repos": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "GoalResultsPolicyQuery": {
            "definitionName": [
                3
            ],
            "configurationName": [
                3
            ],
            "stream": [
                3
            ],
            "paging": [
                87
            ],
            "filter": [
                38
            ],
            "deltaTimestamp": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "GoalResultsQuery": {
            "digest": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "GoalResultsQueryFilter": {
            "policyState": [
                139
            ],
            "hubTeams": [
                3
            ],
            "kvs": [
                82
            ],
            "__typename": [
                3
            ]
        },
        "IbAttestation": {
            "predicateType": [
                3
            ],
            "on_IbAttestationGeneric": [
                40
            ],
            "on_IbAttestationProvenance": [
                41
            ],
            "__typename": [
                3
            ]
        },
        "IbAttestationGeneric": {
            "predicateType": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IbAttestationProvenance": {
            "predicateType": [
                3
            ],
            "base": [
                43
            ],
            "dockerfile": [
                46
            ],
            "git": [
                50
            ],
            "materials": [
                63
            ],
            "mode": [
                44
            ],
            "__typename": [
                3
            ]
        },
        "IbBaseImage": {
            "digest": [
                14
            ],
            "tags": [
                65
            ],
            "createdAt": [
                3
            ],
            "packageCount": [
                17
            ],
            "dockerFile": [
                45
            ],
            "vulnerabilityReport": [
                66
            ],
            "repository": [
                59
            ],
            "sbomState": [
                95
            ],
            "layerCount": [
                17
            ],
            "platform": [
                58
            ],
            "compressedSize": [
                19
            ],
            "labels": [
                61
            ],
            "mediaType": [
                3
            ],
            "provenanceAttestation": [
                64
            ],
            "__typename": [
                3
            ]
        },
        "IbBaseImageProvenance": {
            "digest": [
                3
            ],
            "platform": [
                58
            ],
            "repository": [
                3
            ],
            "tag": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IbBuildKitProvenanceMode": {},
        "IbDockerFile": {
            "path": [
                3
            ],
            "commit": [
                47
            ],
            "__typename": [
                3
            ]
        },
        "IbDockerfileProvenance": {
            "sha": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IbGitCommit": {
            "sha": [
                3
            ],
            "repository": [
                55
            ],
            "__typename": [
                3
            ]
        },
        "IbGithubPullRequest": {
            "providerUrl": [
                3
            ],
            "sourceId": [
                3
            ],
            "author": [
                56
            ],
            "createdAt": [
                3
            ],
            "destinationRef": [
                52
            ],
            "mergedBy": [
                56
            ],
            "requestedReviewers": [
                56
            ],
            "sourceRef": [
                52
            ],
            "state": [
                3
            ],
            "url": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IbGitOrg": {
            "name": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IbGitProvenance": {
            "commitUrl": [
                3
            ],
            "sha": [
                3
            ],
            "source": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IbGitPullRequest": {
            "providerUrl": [
                3
            ],
            "author": [
                56
            ],
            "createdAt": [
                3
            ],
            "destinationRef": [
                52
            ],
            "mergedBy": [
                56
            ],
            "sourceRef": [
                52
            ],
            "state": [
                3
            ],
            "on_IbGithubPullRequest": [
                48
            ],
            "__typename": [
                3
            ]
        },
        "IbGitRef": {
            "name": [
                3
            ],
            "repo": [
                54
            ],
            "type": [
                53
            ],
            "__typename": [
                3
            ]
        },
        "IbGitRefType": {},
        "IbGitRepo": {
            "name": [
                3
            ],
            "org": [
                49
            ],
            "__typename": [
                3
            ]
        },
        "IbGitRepository": {
            "orgName": [
                3
            ],
            "repoName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IbGitUser": {
            "username": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IbImage": {
            "digest": [
                14
            ],
            "tags": [
                65
            ],
            "createdAt": [
                3
            ],
            "packageCount": [
                17
            ],
            "dockerFile": [
                45
            ],
            "vulnerabilityReport": [
                66
            ],
            "repository": [
                59
            ],
            "sbomState": [
                95
            ],
            "layerCount": [
                17
            ],
            "changesets": [
                109
            ],
            "platform": [
                58
            ],
            "compressedSize": [
                19
            ],
            "labels": [
                61
            ],
            "mediaType": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IbImagePlatform": {
            "os": [
                3
            ],
            "architecture": [
                3
            ],
            "variant": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IbImageRepository": {
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "badge": [
                60
            ],
            "supportedTags": [
                3
            ],
            "preferredTags": [
                3
            ],
            "description": [
                3
            ],
            "pullCount": [
                19
            ],
            "starCount": [
                17
            ],
            "platforms": [
                3
            ],
            "previousScannedDigest": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IbImageRepositoryBadge": {},
        "IbLabel": {
            "key": [
                3
            ],
            "value": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IbMatchedImages": {
            "matches": [
                14
            ],
            "images": [
                57
            ],
            "__typename": [
                3
            ]
        },
        "IbMaterialProvenance": {
            "digest": [
                3
            ],
            "uri": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IbProvenanceAttestation": {
            "digest": [
                3
            ],
            "tag": [
                3
            ],
            "repository": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IbTag": {
            "name": [
                3
            ],
            "updatedAt": [
                3
            ],
            "current": [
                12
            ],
            "supported": [
                12
            ],
            "digest": [
                3
            ],
            "mediaType": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IbVulnerabilityReport": {
            "critical": [
                17
            ],
            "high": [
                17
            ],
            "medium": [
                17
            ],
            "low": [
                17
            ],
            "unspecified": [
                17
            ],
            "total": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "IdDetectedSecrets": {
            "digest": [
                3
            ],
            "secrets": [
                23
            ],
            "__typename": [
                3
            ]
        },
        "ImageHistory": {
            "emptyLayer": [
                12
            ],
            "layer": [
                69
            ],
            "ordinal": [
                17
            ],
            "createdAt": [
                3
            ],
            "createdBy": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ImageLayer": {
            "digest": [
                3
            ],
            "mediaType": [
                3
            ],
            "diffId": [
                3
            ],
            "fileLines": [
                27
            ],
            "size": [
                19
            ],
            "__typename": [
                3
            ]
        },
        "ImagePlatform": {
            "os": [
                3
            ],
            "architecture": [
                3
            ],
            "variant": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ImageWithBaseImage": {
            "digest": [
                14
            ],
            "tags": [
                65
            ],
            "createdAt": [
                3
            ],
            "packageCount": [
                17
            ],
            "dockerFile": [
                45
            ],
            "vulnerabilityReport": [
                66
            ],
            "repository": [
                59
            ],
            "sbomState": [
                95
            ],
            "layerCount": [
                17
            ],
            "platform": [
                58
            ],
            "baseImage": [
                57
            ],
            "baseImageTag": [
                65
            ],
            "histories": [
                68
            ],
            "changesets": [
                109
            ],
            "streams": [
                164
            ],
            "compressedSize": [
                19
            ],
            "labels": [
                61
            ],
            "mediaType": [
                3
            ],
            "attestations": [
                39
            ],
            "user": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IndexImageInput": {
            "digest": [
                3
            ],
            "repository": [
                3
            ],
            "tags": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IndexImageResult": {
            "digest": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IpImageLayer": {
            "diffId": [
                3
            ],
            "ordinal": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "IpImageLayers": {
            "layers": [
                74
            ],
            "__typename": [
                3
            ]
        },
        "IpImagePackage": {
            "package": [
                84
            ],
            "locations": [
                85
            ],
            "__typename": [
                3
            ]
        },
        "IpImagePackages": {
            "packages": [
                76
            ],
            "__typename": [
                3
            ]
        },
        "IpImagePackagesByDigest": {
            "digest": [
                3
            ],
            "sbomState": [
                95
            ],
            "imagePackages": [
                77
            ],
            "imageLayers": [
                75
            ],
            "imageHistories": [
                68
            ],
            "__typename": [
                3
            ]
        },
        "IpImagePackagesByDigestQuery": {
            "includeExcepted": [
                12
            ],
            "includePublic": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "IpImagePackagesForImageCoords": {
            "digest": [
                3
            ],
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "sbomState": [
                95
            ],
            "imagePackages": [
                77
            ],
            "imageLayers": [
                75
            ],
            "imageHistories": [
                68
            ],
            "__typename": [
                3
            ]
        },
        "IpImagePackagesForImageCoordsQuery": {
            "digest": [
                3
            ],
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "includeExcepted": [
                12
            ],
            "includePublic": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "KVFilterInput": {
            "key": [
                3
            ],
            "values": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "MatchedSecretSeverity": {},
        "Package": {
            "name": [
                3
            ],
            "description": [
                3
            ],
            "purl": [
                3
            ],
            "purlFields": [
                146
            ],
            "type": [
                3
            ],
            "namespace": [
                3
            ],
            "version": [
                3
            ],
            "author": [
                3
            ],
            "licenses": [
                3
            ],
            "vulnerabilities": [
                254
            ],
            "__typename": [
                3
            ]
        },
        "PackageLocation": {
            "path": [
                3
            ],
            "diffId": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "Paging": {
            "totalCount": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "PagingInput": {
            "pageSize": [
                17
            ],
            "page": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "PkVexStatement": {
            "author": [
                3
            ],
            "timestamp": [
                3
            ],
            "sourceType": [
                90
            ],
            "id": [
                3
            ],
            "type": [
                32
            ],
            "justification": [
                249
            ],
            "documentUrl": [
                3
            ],
            "status": [
                250
            ],
            "additionalDetails": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "PkVulnerabilityException": {
            "author": [
                3
            ],
            "timestamp": [
                3
            ],
            "sourceType": [
                90
            ],
            "id": [
                3
            ],
            "type": [
                32
            ],
            "justification": [
                249
            ],
            "documentUrl": [
                3
            ],
            "status": [
                250
            ],
            "additionalDetails": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "PkVulnerabilityExceptionSourceType": {},
        "PolicySummaryQuery": {
            "stream": [
                3
            ],
            "deltaTimestamp": [
                3
            ],
            "definitionName": [
                3
            ],
            "configurationName": [
                3
            ],
            "filter": [
                92
            ],
            "orgFilters": [
                124
            ],
            "__typename": [
                3
            ]
        },
        "PolicySummaryQueryFilter": {
            "repos": [
                160
            ],
            "hubTeams": [
                3
            ],
            "kvs": [
                82
            ],
            "__typename": [
                3
            ]
        },
        "RemoveVulnerabilityExceptionInput": {
            "ids": [
                14
            ],
            "__typename": [
                3
            ]
        },
        "RemoveVulnerabilityExceptionResult": {
            "ids": [
                14
            ],
            "__typename": [
                3
            ]
        },
        "SBOMState": {},
        "ScBaseImageSummary": {
            "repository": [
                59
            ],
            "imageCount": [
                17
            ],
            "childImageCount": [
                17
            ],
            "packages": [
                126
            ],
            "__typename": [
                3
            ]
        },
        "ScBooleanPolicy": {
            "definitionName": [
                3
            ],
            "configurationName": [
                3
            ],
            "displayName": [
                3
            ],
            "description": [
                3
            ],
            "evaluated": [
                12
            ],
            "currentResult": [
                98
            ],
            "latestDelta": [
                128
            ],
            "remediations": [
                152,
                {
                    "filter": [
                        158,
                        "ScRemediationFilter!"
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "ScBooleanPolicyResult": {
            "statusLabel": [
                3
            ],
            "createdDateTime": [
                3
            ],
            "hasDeviation": [
                12
            ],
            "deviation": [
                135
            ],
            "isStale": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "ScDockerRepository": {
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScGenericPolicy": {
            "definitionName": [
                3
            ],
            "configurationName": [
                3
            ],
            "displayName": [
                3
            ],
            "description": [
                3
            ],
            "evaluated": [
                12
            ],
            "currentResult": [
                101
            ],
            "latestDelta": [
                128
            ],
            "remediations": [
                152,
                {
                    "filter": [
                        158,
                        "ScRemediationFilter!"
                    ]
                }
            ],
            "remediationLink": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScGenericPolicyResult": {
            "statusLabel": [
                3
            ],
            "deviations": [
                135
            ],
            "deviationCount": [
                17
            ],
            "createdDateTime": [
                3
            ],
            "isStale": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "ScGroupedPackage": {
            "packageRoot": [
                127
            ],
            "versionCount": [
                17
            ],
            "repositories": [
                99
            ],
            "uniqueVulnerabilityReport": [
                255
            ],
            "images": [
                112
            ],
            "imageCount": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "ScGroupedPackagesFilter": {
            "packageName": [
                3
            ],
            "packageType": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScGroupedPackagesOrdering": {
            "field": [
                105
            ],
            "sortOrder": [
                231
            ],
            "__typename": [
                3
            ]
        },
        "ScGroupedPackagesOrderingField": {},
        "ScImageAffectedByCVE": {
            "affectedImage": [
                71
            ],
            "affectedPackages": [
                108
            ],
            "__typename": [
                3
            ]
        },
        "ScImageAffectedByCVEChangeset": {
            "ordinal": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "ScImageAffectedByCVEPackage": {
            "version": [
                3
            ],
            "namespace": [
                3
            ],
            "name": [
                3
            ],
            "osName": [
                3
            ],
            "osVersion": [
                3
            ],
            "type": [
                3
            ],
            "purl": [
                3
            ],
            "changesets": [
                107
            ],
            "locations": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScImageChangeset": {
            "history": [
                110
            ],
            "layer": [
                111
            ],
            "ordinal": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "ScImageHistory": {
            "createdAt": [
                3
            ],
            "createdBy": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScImageLayer": {
            "digest": [
                3
            ],
            "mediaType": [
                3
            ],
            "size": [
                19
            ],
            "__typename": [
                3
            ]
        },
        "ScImageRepository": {
            "digest": [
                3
            ],
            "repository": [
                99
            ],
            "__typename": [
                3
            ]
        },
        "ScImagesAffectedByCVEFilter": {
            "repoName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScImagesAffectedByCVEOrdering": {
            "field": [
                115
            ],
            "sortOrder": [
                231
            ],
            "__typename": [
                3
            ]
        },
        "ScImagesAffectedByCVEOrderingField": {},
        "ScImagesAffectedByCVEQuery": {
            "cveId": [
                3
            ],
            "stream": [
                3
            ],
            "paging": [
                87
            ],
            "filter": [
                113
            ],
            "ordering": [
                114
            ],
            "__typename": [
                3
            ]
        },
        "ScImagesAffectedByCVEResult": {
            "paging": [
                86
            ],
            "items": [
                106
            ],
            "packageCount": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "ScImageVulnerabilitiesByDigest": {
            "digest": [
                3
            ],
            "vulnerabilities": [
                253
            ],
            "__typename": [
                3
            ]
        },
        "ScImageVulnerabilitiesByDigestQuery": {
            "includeExcepted": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "ScInformationRemediation": {
            "id": [
                3
            ],
            "acceptedBy": [
                3
            ],
            "changesets": [
                153
            ],
            "createdAt": [
                3
            ],
            "details": [
                155
            ],
            "errors": [
                156
            ],
            "kind": [
                3
            ],
            "score": [
                17
            ],
            "state": [
                159
            ],
            "updatedAt": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScLicencePolicy": {
            "definitionName": [
                3
            ],
            "configurationName": [
                3
            ],
            "displayName": [
                3
            ],
            "description": [
                3
            ],
            "evaluated": [
                12
            ],
            "licenses": [
                3
            ],
            "currentResult": [
                122
            ],
            "latestDelta": [
                128
            ],
            "remediations": [
                152,
                {
                    "filter": [
                        158,
                        "ScRemediationFilter!"
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "ScLicencePolicyResult": {
            "statusLabel": [
                3
            ],
            "deviations": [
                137
            ],
            "deviationCount": [
                17
            ],
            "createdDateTime": [
                3
            ],
            "isStale": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "ScOrganizationFilter": {
            "name": [
                3
            ],
            "values": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScOrganizationFilterInput": {
            "name": [
                3
            ],
            "value": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScOrganizationStatus": {
            "hasImageAnalysisEnabled": [
                12
            ],
            "hasAnalyzedImages": [
                12
            ],
            "hasEverAnalyzedImages": [
                12
            ],
            "lastRepoEnablementChangeAt": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScPackageRange": {
            "minCount": [
                17
            ],
            "maxCount": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "ScPackageRoot": {
            "name": [
                3
            ],
            "type": [
                3
            ],
            "namespace": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScPolicyDelta": {
            "deltaReason": [
                129
            ],
            "deltaChange": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "ScPolicyDeltaReason": {},
        "ScPolicyImage": {
            "digest": [
                3
            ],
            "tags": [
                65
            ],
            "repository": [
                134
            ],
            "createdAt": [
                3
            ],
            "platform": [
                58
            ],
            "policies": [
                11
            ],
            "__typename": [
                3
            ]
        },
        "ScPolicyInfo": {
            "definitionName": [
                3
            ],
            "configurationName": [
                3
            ],
            "displayName": [
                3
            ],
            "description": [
                3
            ],
            "resultType": [
                3
            ],
            "owner": [
                132
            ],
            "enabled": [
                12
            ],
            "remediationLink": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScPolicyOwner": {},
        "ScPolicyPackageLocation": {
            "layerOrdinal": [
                17
            ],
            "path": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScPolicyRepo": {
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScPolicyResultGenericDeviation": {
            "id": [
                3
            ],
            "details": [
                136
            ],
            "__typename": [
                3
            ]
        },
        "ScPolicyResultGenericDeviationDetail": {
            "key": [
                3
            ],
            "value": [
                3
            ],
            "displayName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScPolicyResultLicenceDeviation": {
            "id": [
                3
            ],
            "purl": [
                3
            ],
            "license": [
                3
            ],
            "locations": [
                133
            ],
            "__typename": [
                3
            ]
        },
        "ScPolicyResultVulnerabilityDeviation": {
            "id": [
                3
            ],
            "vulnerability": [
                3
            ],
            "purl": [
                3
            ],
            "severity": [
                21
            ],
            "cvssScore": [
                3
            ],
            "fixedBy": [
                3
            ],
            "locations": [
                133
            ],
            "__typename": [
                3
            ]
        },
        "ScPolicyState": {},
        "ScPolicyStream": {
            "latestImage": [
                130
            ],
            "policies": [
                11
            ],
            "__typename": [
                3
            ]
        },
        "ScPolicyStreamResult": {
            "paging": [
                86
            ],
            "items": [
                140
            ],
            "__typename": [
                3
            ]
        },
        "ScPolicySummary": {
            "policy": [
                131
            ],
            "stream": [
                3
            ],
            "totalImages": [
                17
            ],
            "compliantImages": [
                17
            ],
            "totalDeviations": [
                17
            ],
            "unknownImages": [
                17
            ],
            "delta": [
                143
            ],
            "__typename": [
                3
            ]
        },
        "ScPolicySummaryDelta": {
            "compliantImages": [
                17
            ],
            "totalDeviations": [
                17
            ],
            "totalImages": [
                17
            ],
            "unknownImages": [
                17
            ],
            "timestamp": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScPolicySummaryResult": {
            "items": [
                142
            ],
            "__typename": [
                3
            ]
        },
        "ScPullRequestRemediation": {
            "id": [
                3
            ],
            "acceptedBy": [
                3
            ],
            "changesets": [
                153
            ],
            "createdAt": [
                3
            ],
            "details": [
                155
            ],
            "errors": [
                156
            ],
            "kind": [
                3
            ],
            "score": [
                17
            ],
            "state": [
                159
            ],
            "updatedAt": [
                3
            ],
            "pullRequest": [
                51
            ],
            "__typename": [
                3
            ]
        },
        "ScPurl": {
            "namespace": [
                3
            ],
            "name": [
                3
            ],
            "type": [
                3
            ],
            "version": [
                3
            ],
            "qualifiers": [
                3
            ],
            "subpath": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScPurlInput": {
            "namespace": [
                3
            ],
            "name": [
                3
            ],
            "type": [
                3
            ],
            "version": [
                3
            ],
            "qualifiers": [
                3
            ],
            "subpath": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScRecentCVE": {
            "cveId": [
                3
            ],
            "highestSeverity": [
                21
            ],
            "highestCVSSScore": [
                3
            ],
            "detectedInCount": [
                17
            ],
            "publishedAt": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScRecentCVEsFilter": {
            "severities": [
                21
            ],
            "__typename": [
                3
            ]
        },
        "ScRecentCVEsQuery": {
            "stream": [
                3
            ],
            "filter": [
                149
            ],
            "__typename": [
                3
            ]
        },
        "ScRecentCVEsResult": {
            "items": [
                148
            ],
            "__typename": [
                3
            ]
        },
        "ScRemediation": {
            "id": [
                3
            ],
            "acceptedBy": [
                3
            ],
            "changesets": [
                153
            ],
            "createdAt": [
                3
            ],
            "details": [
                155
            ],
            "errors": [
                156
            ],
            "kind": [
                3
            ],
            "score": [
                17
            ],
            "state": [
                159
            ],
            "updatedAt": [
                3
            ],
            "on_ScInformationRemediation": [
                120
            ],
            "on_ScPullRequestRemediation": [
                145
            ],
            "__typename": [
                3
            ]
        },
        "ScRemediationChangeset": {
            "id": [
                3
            ],
            "message": [
                3
            ],
            "patches": [
                154
            ],
            "__typename": [
                3
            ]
        },
        "ScRemediationChangesetPatches": {
            "file": [
                3
            ],
            "patch": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScRemediationDetail": {
            "key": [
                3
            ],
            "value": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScRemediationError": {
            "kind": [
                3
            ],
            "details": [
                157
            ],
            "__typename": [
                3
            ]
        },
        "ScRemediationErrorDetail": {
            "key": [
                3
            ],
            "value": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScRemediationFilter": {
            "states": [
                159
            ],
            "__typename": [
                3
            ]
        },
        "ScRemediationState": {},
        "ScRepositoryInput": {
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScRepositoryQuery": {
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScSinglePolicyResult": {
            "latestImage": [
                130
            ],
            "policy": [
                11
            ],
            "__typename": [
                3
            ]
        },
        "ScSinglePolicyResults": {
            "paging": [
                86
            ],
            "items": [
                162
            ],
            "__typename": [
                3
            ]
        },
        "ScStream": {
            "name": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamBaseImagesSummaryFilter": {
            "repoName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamBaseImagesSummaryOrdering": {
            "field": [
                167
            ],
            "sortOrder": [
                231
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamBaseImagesSummaryOrderingField": {},
        "ScStreamBaseImagesSummaryQuery": {
            "stream": [
                3
            ],
            "paging": [
                87
            ],
            "filter": [
                165
            ],
            "ordering": [
                166
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamBaseImagesSummaryResult": {
            "paging": [
                86
            ],
            "items": [
                96
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamCVE": {
            "cveId": [
                3
            ],
            "highestSeverity": [
                21
            ],
            "highestCVSSScore": [
                3
            ],
            "detectedInCount": [
                17
            ],
            "fixable": [
                12
            ],
            "packages": [
                232
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamCVEsFilter": {
            "cveId": [
                3
            ],
            "severity": [
                21
            ],
            "repos": [
                160
            ],
            "severities": [
                21
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamCVEsOrdering": {
            "field": [
                173
            ],
            "sortOrder": [
                231
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamCVEsOrderingField": {},
        "ScStreamCVEsQuery": {
            "stream": [
                3
            ],
            "paging": [
                87
            ],
            "filter": [
                171
            ],
            "ordering": [
                172
            ],
            "orgFilters": [
                124
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamCVEsResult": {
            "paging": [
                86
            ],
            "items": [
                170
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamGroupedPackagesQuery": {
            "stream": [
                3
            ],
            "paging": [
                87
            ],
            "filter": [
                103
            ],
            "ordering": [
                104
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamGroupedPackagesResult": {
            "paging": [
                86
            ],
            "items": [
                102
            ],
            "packageTypes": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamImagesByBaseImageFilter": {
            "repoName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamImagesByBaseImageOrdering": {
            "field": [
                180
            ],
            "sortOrder": [
                231
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamImagesByBaseImageOrderingField": {},
        "ScStreamImagesByBaseImageQuery": {
            "stream": [
                3
            ],
            "repository": [
                160
            ],
            "paging": [
                87
            ],
            "filter": [
                178
            ],
            "ordering": [
                179
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamImagesByBaseImageResult": {
            "paging": [
                86
            ],
            "items": [
                71
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamImagesFilter": {
            "repoName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamImagesOrdering": {
            "field": [
                185
            ],
            "sortOrder": [
                231
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamImagesOrderingField": {},
        "ScStreamImagesQuery": {
            "stream": [
                3
            ],
            "paging": [
                87
            ],
            "filter": [
                183
            ],
            "ordering": [
                184
            ],
            "orgFilters": [
                124
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamImagesResult": {
            "paging": [
                86
            ],
            "items": [
                71
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamsQuery": {
            "paging": [
                87
            ],
            "filter": [
                189
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamsQueryFilter": {
            "namePrefix": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScStreamsResult": {
            "paging": [
                86
            ],
            "items": [
                164
            ],
            "__typename": [
                3
            ]
        },
        "ScTaggedImagesFilter": {
            "tagName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScTaggedImagesOrdering": {
            "field": [
                193
            ],
            "sortOrder": [
                231
            ],
            "__typename": [
                3
            ]
        },
        "ScTaggedImagesOrderingField": {},
        "ScTaggedImagesQuery": {
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "paging": [
                87
            ],
            "filter": [
                191
            ],
            "ordering": [
                192
            ],
            "__typename": [
                3
            ]
        },
        "ScTaggedImagesResult": {
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "paging": [
                86
            ],
            "tags": [
                196
            ],
            "images": [
                71
            ],
            "__typename": [
                3
            ]
        },
        "ScTagWithDigest": {
            "name": [
                3
            ],
            "digest": [
                14
            ],
            "updatedAt": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScUserResult": {
            "id": [
                14
            ],
            "email": [
                3
            ],
            "name": [
                3
            ],
            "username": [
                3
            ],
            "avatarUrl": [
                3
            ],
            "orgs": [
                28
            ],
            "__typename": [
                3
            ]
        },
        "ScVEX": {
            "id": [
                3
            ],
            "author": [
                3
            ],
            "role": [
                3
            ],
            "timestamp": [
                3
            ],
            "version": [
                3
            ],
            "statements": [
                203
            ],
            "__typename": [
                3
            ]
        },
        "ScVexDocument": {
            "id": [
                3
            ],
            "documentUrl": [
                3
            ],
            "timestamp": [
                3
            ],
            "author": [
                3
            ],
            "version": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScVEXsQuery": {
            "repoName": [
                3
            ],
            "tag": [
                3
            ],
            "digest": [
                3
            ],
            "hostName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScVEXsResult": {
            "documents": [
                198
            ],
            "__typename": [
                3
            ]
        },
        "ScVexStatement": {
            "id": [
                14
            ],
            "document": [
                199
            ],
            "timestamp": [
                3
            ],
            "cveId": [
                3
            ],
            "status": [
                213
            ],
            "justification": [
                207
            ],
            "impactStatement": [
                3
            ],
            "imageScopes": [
                205
            ],
            "packageScopes": [
                208
            ],
            "errors": [
                204
            ],
            "__typename": [
                3
            ]
        },
        "ScVEXStatement": {
            "sourceId": [
                3
            ],
            "status": [
                3
            ],
            "statusNotes": [
                3
            ],
            "justification": [
                3
            ],
            "actionStatement": [
                3
            ],
            "impactStatement": [
                3
            ],
            "products": [
                3
            ],
            "subcomponents": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScVexStatementError": {
            "message": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScVexStatementImageScope": {
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "digest": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScVexStatementImageScopeInput": {
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "digest": [
                3
            ],
            "packageScopes": [
                209
            ],
            "__typename": [
                3
            ]
        },
        "ScVexStatementJustification": {},
        "ScVexStatementPackageScope": {
            "namespace": [
                3
            ],
            "name": [
                3
            ],
            "purl": [
                3
            ],
            "type": [
                3
            ],
            "version": [
                3
            ],
            "qualifiers": [
                3
            ],
            "subpath": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScVexStatementPackageScopeInput": {
            "purlFields": [
                147
            ],
            "__typename": [
                3
            ]
        },
        "ScVexStatementsQuery": {
            "filter": [
                211
            ],
            "paging": [
                87
            ],
            "__typename": [
                3
            ]
        },
        "ScVexStatementsQueryFilter": {
            "stream": [
                3
            ],
            "cveIdQuery": [
                3
            ],
            "digest": [
                3
            ],
            "status": [
                213
            ],
            "justification": [
                207
            ],
            "hasError": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "ScVexStatementsQueryResult": {
            "items": [
                202
            ],
            "itemsWithErrorsCount": [
                17
            ],
            "paging": [
                86
            ],
            "__typename": [
                3
            ]
        },
        "ScVexStatementStatus": {},
        "ScVulnerabilityException": {
            "id": [
                14
            ],
            "author": [
                3
            ],
            "timestamp": [
                3
            ],
            "errors": [
                215
            ],
            "vulnerability": [
                222
            ],
            "type": [
                220
            ],
            "imageScopes": [
                216
            ],
            "reason": [
                218
            ],
            "__typename": [
                3
            ]
        },
        "ScVulnerabilityExceptionError": {
            "message": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScVulnerabilityExceptionImageScope": {
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "digest": [
                3
            ],
            "packageScopes": [
                217
            ],
            "__typename": [
                3
            ]
        },
        "ScVulnerabilityExceptionPackageScope": {
            "purl": [
                3
            ],
            "purlFields": [
                146
            ],
            "__typename": [
                3
            ]
        },
        "ScVulnerabilityExceptionReason": {
            "justification": [
                207
            ],
            "additionalDetails": [
                3
            ],
            "source": [
                13
            ],
            "__typename": [
                3
            ]
        },
        "ScVulnerabilityExceptionScoutSource": {
            "id": [
                14
            ],
            "__typename": [
                3
            ]
        },
        "ScVulnerabilityExceptionType": {},
        "ScVulnerabilityExceptionVEXSource": {
            "id": [
                14
            ],
            "document": [
                199
            ],
            "__typename": [
                3
            ]
        },
        "ScVulnerabilityExceptionVulnerability": {
            "cveId": [
                3
            ],
            "highestSeverity": [
                21
            ],
            "highestCVSSScore": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScVulnerabilityPolicy": {
            "definitionName": [
                3
            ],
            "configurationName": [
                3
            ],
            "displayName": [
                3
            ],
            "description": [
                3
            ],
            "evaluated": [
                12
            ],
            "currentResult": [
                224
            ],
            "latestDelta": [
                128
            ],
            "remediations": [
                152,
                {
                    "filter": [
                        158,
                        "ScRemediationFilter!"
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "ScVulnerabilityPolicyResult": {
            "statusLabel": [
                3
            ],
            "deviations": [
                138
            ],
            "deviationCount": [
                17
            ],
            "createdDateTime": [
                3
            ],
            "isStale": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "SdImageSummary": {
            "digest": [
                3
            ],
            "sbomState": [
                95
            ],
            "vulnerabilityReport": [
                255
            ],
            "__typename": [
                3
            ]
        },
        "SecretFinding": {
            "ruleId": [
                3
            ],
            "category": [
                3
            ],
            "title": [
                3
            ],
            "severity": [
                83
            ],
            "match": [
                3
            ],
            "startLine": [
                17
            ],
            "endLine": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "SetStreamImagesImage": {
            "image": [
                3
            ],
            "appName": [
                3
            ],
            "platform": [
                70
            ],
            "__typename": [
                3
            ]
        },
        "SetStreamImagesInput": {
            "stream": [
                3
            ],
            "images": [
                227
            ],
            "__typename": [
                3
            ]
        },
        "SetStreamImagesResult": {
            "status": [
                230
            ],
            "__typename": [
                3
            ]
        },
        "SetStreamImagesStatus": {},
        "SortOrder": {},
        "StreamCVEPackage": {
            "purl": [
                3
            ],
            "severity": [
                21
            ],
            "cvssScore": [
                3
            ],
            "fixedBy": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "StrVulnerabilityReports": {
            "items": [
                237
            ],
            "__typename": [
                3
            ]
        },
        "StrVulnerabilityReportsQuery": {
            "stream": [
                3
            ],
            "summaryType": [
                236
            ],
            "timescale": [
                235
            ],
            "__typename": [
                3
            ]
        },
        "StrVulnerabilityReportsQueryTimescale": {},
        "StrVulnerabilityReportsSummaryType": {},
        "TimestampedVulnerabilityReport": {
            "timestamp": [
                3
            ],
            "vulnerabilityReport": [
                255
            ],
            "__typename": [
                3
            ]
        },
        "TrDockerRepository": {
            "name": [
                3
            ],
            "pullCount": [
                19
            ],
            "starCount": [
                17
            ],
            "description": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "TrDockerTag": {
            "digest": [
                3
            ],
            "indexDigest": [
                3
            ],
            "createdAt": [
                3
            ],
            "packageCount": [
                17
            ],
            "imageSize": [
                19
            ],
            "size": [
                17
            ],
            "tags": [
                3
            ],
            "aliases": [
                3
            ],
            "vulnerabilityReport": [
                255
            ],
            "vulnerabilities": [
                255
            ],
            "tag": [
                244
            ],
            "scoring": [
                242
            ],
            "__typename": [
                3
            ]
        },
        "TrRecommendations": {
            "currentTag": [
                239
            ],
            "recommendedTags": [
                239
            ],
            "__typename": [
                3
            ]
        },
        "TrRecommendedTags": {
            "repository": [
                238
            ],
            "recommendations": [
                240
            ],
            "__typename": [
                3
            ]
        },
        "TrScoring": {
            "total": [
                17
            ],
            "summary": [
                3
            ],
            "details": [
                243
            ],
            "__typename": [
                3
            ]
        },
        "TrScoringDetails": {
            "name": [
                3
            ],
            "reason": [
                3
            ],
            "score": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "TrTagData": {
            "name": [
                3
            ],
            "os": [
                3
            ],
            "framework": [
                3
            ],
            "runtime": [
                3
            ],
            "flavor": [
                3
            ],
            "slim": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "TrTagRecommendationResult": {
            "digest": [
                3
            ],
            "recommendedTags": [
                241
            ],
            "__typename": [
                3
            ]
        },
        "TrTagRecommendationsByDigestsResult": {
            "items": [
                245
            ],
            "__typename": [
                3
            ]
        },
        "UpdateVulnerabilityExceptionInput": {
            "id": [
                14
            ],
            "cveId": [
                3
            ],
            "type": [
                220
            ],
            "justification": [
                207
            ],
            "additionalDetails": [
                3
            ],
            "imageScopes": [
                206
            ],
            "__typename": [
                3
            ]
        },
        "UpdateVulnerabilityExceptionResult": {
            "exception": [
                214
            ],
            "__typename": [
                3
            ]
        },
        "VEXStatementJustification": {},
        "VEXStatementStatus": {},
        "VpCVSS": {
            "severity": [
                21
            ],
            "version": [
                22
            ],
            "score": [
                19
            ],
            "vector": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "VpCWE": {
            "cweId": [
                3
            ],
            "description": [
                3
            ],
            "url": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "VpPackageVulnerability": {
            "purl": [
                3
            ],
            "vulnerabilities": [
                254
            ],
            "__typename": [
                3
            ]
        },
        "VpVulnerability": {
            "sourceId": [
                3
            ],
            "source": [
                3
            ],
            "description": [
                3
            ],
            "cwes": [
                252
            ],
            "cvss": [
                251
            ],
            "fixedBy": [
                3
            ],
            "vulnerableRange": [
                3
            ],
            "url": [
                3
            ],
            "publishedAt": [
                3
            ],
            "updatedAt": [
                3
            ],
            "epss": [
                30
            ],
            "cisaExploited": [
                12
            ],
            "isExcepted": [
                12
            ],
            "vulnerabilityExceptions": [
                89
            ],
            "vexStatements": [
                88
            ],
            "__typename": [
                3
            ]
        },
        "VulnerabilityReport": {
            "critical": [
                17
            ],
            "high": [
                17
            ],
            "medium": [
                17
            ],
            "low": [
                17
            ],
            "unspecified": [
                17
            ],
            "total": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "ArtifactoryAgentEntitlement": {
            "enabled": [
                12
            ],
            "planRequirement": [
                277
            ],
            "__typename": [
                3
            ]
        },
        "BillingCycle": {},
        "BillingOrigin": {},
        "BlockedRepoResult": {
            "hostName": [
                3
            ],
            "namespace": [
                3
            ],
            "repoName": [
                3
            ],
            "blocked": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "ConfigurablePolicyEntitlement": {
            "enabled": [
                12
            ],
            "planRequirement": [
                277
            ],
            "__typename": [
                3
            ]
        },
        "DhiEntitlement": {
            "dhiEnabled": [
                12
            ],
            "canMirrorMoreRepositories": [
                12
            ],
            "canViewCatalog": [
                12
            ],
            "repositoriesLimit": [
                17
            ],
            "mirroredRepositoriesCount": [
                17
            ],
            "freeTrial": [
                12
            ],
            "freeTrialEndDate": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DhiRepoFeature": {
            "isDhiRepo": [
                12
            ],
            "dhiMirroredRepository": [
                264
            ],
            "__typename": [
                3
            ]
        },
        "EnabledRepositoriesResult": {
            "repos": [
                290
            ],
            "count": [
                17
            ],
            "entitlementUsed": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "EntitlementsDhiMirroredRepository": {
            "id": [
                3
            ],
            "dhiSourceRepository": [
                265
            ],
            "__typename": [
                3
            ]
        },
        "EntitlementsDhiSourceRepository": {
            "name": [
                3
            ],
            "namespace": [
                3
            ],
            "displayName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "FeatureEntitlement": {
            "enabled": [
                12
            ],
            "planRequirement": [
                277
            ],
            "on_ArtifactoryAgentEntitlement": [
                256
            ],
            "on_ConfigurablePolicyEntitlement": [
                260
            ],
            "on_LocalRepositoryEntitlement": [
                272
            ],
            "on_RemoteRepositoryEntitlement": [
                285
            ],
            "on_VulnerabilityReportingEntitlement": [
                305
            ],
            "__typename": [
                3
            ]
        },
        "FeatureEntitlements": {
            "artifactoryAgent": [
                256
            ],
            "configurablePolicy": [
                260
            ],
            "localRepository": [
                272
            ],
            "remoteRepository": [
                285
            ],
            "scoutAPI": [
                294
            ],
            "vulnerabilityReporting": [
                305
            ],
            "scoutEverywhere": [
                298
            ],
            "dhi": [
                261
            ],
            "enableOnPush": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "Integration": {
            "skill": [
                303
            ],
            "configurationName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IntegrationConfigurationFilter": {
            "skill": [
                304
            ],
            "configurationName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IntegrationConfigurationInput": {
            "skill": [
                304
            ],
            "configurationName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ListBlockedReposResult": {
            "repos": [
                290
            ],
            "count": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "LocalRepositoryEntitlement": {
            "enabled": [
                12
            ],
            "accountLimit": [
                17
            ],
            "isUnlimited": [
                12
            ],
            "planLimit": [
                17
            ],
            "planRequirement": [
                277
            ],
            "__typename": [
                3
            ]
        },
        "Maintenance": {
            "severity": [
                274
            ],
            "title": [
                3
            ],
            "message": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "MaintenanceSeverity": {},
        "MultiRepoVulnerabilityReportingInput": {
            "repoNames": [
                3
            ],
            "hostName": [
                3
            ],
            "enabled": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "NamespaceEntitlements": {
            "namespace": [
                3
            ],
            "plan": [
                293
            ],
            "isEnrolled": [
                12
            ],
            "scoutEnrollment": [
                295
            ],
            "featureEntitlements": [
                267
            ],
            "__typename": [
                3
            ]
        },
        "PlanRequirement": {
            "plan": [
                278
            ],
            "tier": [
                284
            ],
            "__typename": [
                3
            ]
        },
        "ProductPlan": {},
        "ProductSubscription": {
            "tier": [
                284
            ],
            "billingCycle": [
                257
            ],
            "quantity": [
                282
            ],
            "renewalEnabled": [
                12
            ],
            "renewalDate": [
                3
            ],
            "endDate": [
                3
            ],
            "status": [
                283
            ],
            "graceDays": [
                17
            ],
            "renewalAmount": [
                17
            ],
            "totalAmount": [
                17
            ],
            "origin": [
                258
            ],
            "pendingChanges": [
                280
            ],
            "__typename": [
                3
            ]
        },
        "ProductSubscriptionPendingChange": {
            "type": [
                281
            ],
            "date": [
                3
            ],
            "tier": [
                284
            ],
            "billingCycle": [
                3
            ],
            "quantity": [
                282
            ],
            "__typename": [
                3
            ]
        },
        "ProductSubscriptionPendingChangeType": {},
        "ProductSubscriptionQuantity": {
            "value": [
                17
            ],
            "unit": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ProductSubscriptionStatus": {},
        "ProductTier": {},
        "RemoteRepositoryEntitlement": {
            "enabled": [
                12
            ],
            "accountLimit": [
                17
            ],
            "isUnlimited": [
                12
            ],
            "planLimit": [
                17
            ],
            "planRequirement": [
                277
            ],
            "enabledRepoCount": [
                17
            ],
            "entitlementUsed": [
                17
            ],
            "repoEntitlementExceeded": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "ReposBlockedInput": {
            "hostName": [
                3
            ],
            "repoNames": [
                3
            ],
            "blocked": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "RepositoryFeatureResult": {
            "namespace": [
                3
            ],
            "repoName": [
                3
            ],
            "hostName": [
                3
            ],
            "features": [
                288
            ],
            "__typename": [
                3
            ]
        },
        "RepositoryFeatures": {
            "vulnerabilityReporting": [
                306
            ],
            "dhi": [
                262
            ],
            "__typename": [
                3
            ]
        },
        "RepositoryProperties": {
            "preventDisable": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "RepositoryResult": {
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "integration": [
                268
            ],
            "type": [
                291
            ],
            "properties": [
                289
            ],
            "__typename": [
                3
            ]
        },
        "RepositoryType": {},
        "RepoVulnerabilityReportingInput": {
            "repoName": [
                3
            ],
            "hostName": [
                3
            ],
            "enabled": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "ScEntitlementsPlan": {
            "displayName": [
                3
            ],
            "isLegacy": [
                12
            ],
            "isFree": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "ScoutAPIEntitlement": {
            "enabled": [
                12
            ],
            "accessRestrictedDueToRepoLimits": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "ScoutEnrollment": {
            "plan": [
                278
            ],
            "activeSubscription": [
                279
            ],
            "features": [
                296
            ],
            "__typename": [
                3
            ]
        },
        "ScoutEnrollmentFeatures": {
            "repository": [
                297
            ],
            "__typename": [
                3
            ]
        },
        "ScoutEnrollmentFeaturesRepo": {
            "local": [
                17
            ],
            "remote": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "ScoutEverywhereEntitlement": {
            "scanningEnabled": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "ServiceStatusResult": {
            "maintenance": [
                273
            ],
            "__typename": [
                3
            ]
        },
        "SetEnableReposOnPushInput": {
            "enabled": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "SetEnableReposOnPushResult": {
            "enabled": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "ShouldEnableReposOnPushResult": {
            "enabled": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "Skill": {
            "namespace": [
                3
            ],
            "name": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "SkillInput": {
            "namespace": [
                3
            ],
            "name": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "VulnerabilityReportingEntitlement": {
            "enabled": [
                12
            ],
            "accountLimit": [
                17
            ],
            "planLimit": [
                17
            ],
            "planRequirement": [
                277
            ],
            "limit": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "VulnerabilityReportingRepoFeature": {
            "enabled": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "VulnerabilityReportingResult": {
            "namespace": [
                3
            ],
            "repoName": [
                3
            ],
            "hostName": [
                3
            ],
            "vulnerabilityReporting": [
                306
            ],
            "__typename": [
                3
            ]
        },
        "MgAttestation": {
            "digest": [
                3
            ],
            "predicateType": [
                3
            ],
            "reference": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "MgAttestationBuildArg": {
            "key": [
                3
            ],
            "value": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "MgAttestationBuildParameters": {
            "args": [
                309
            ],
            "__typename": [
                3
            ]
        },
        "MgAttestationDockerfile": {
            "rawContent": [
                3
            ],
            "sourceMap": [
                312
            ],
            "__typename": [
                3
            ]
        },
        "MgAttestationDockerfileSourceMap": {
            "digests": [
                3
            ],
            "endColumn": [
                17
            ],
            "endLine": [
                17
            ],
            "instruction": [
                3
            ],
            "source": [
                3
            ],
            "startColumn": [
                17
            ],
            "startLine": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "MgAttestationOCIConfig": {
            "config": [
                314
            ],
            "__typename": [
                3
            ]
        },
        "MgAttestationOCIConfigConfig": {
            "user": [
                3
            ],
            "exposedPorts": [
                3
            ],
            "env": [
                3
            ],
            "entrypoint": [
                3
            ],
            "cmd": [
                3
            ],
            "volumes": [
                3
            ],
            "workingDir": [
                3
            ],
            "labels": [
                316
            ],
            "stopSignal": [
                3
            ],
            "argsEscaped": [
                12
            ],
            "memory": [
                17
            ],
            "memorySwap": [
                17
            ],
            "cpuShares": [
                17
            ],
            "healthcheck": [
                315
            ],
            "__typename": [
                3
            ]
        },
        "MgAttestationOCIConfigConfigHealthcheck": {
            "test": [
                3
            ],
            "interval": [
                17
            ],
            "timeout": [
                17
            ],
            "retries": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "MgAttestationOCIConfigConfigLabel": {
            "key": [
                3
            ],
            "value": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "MgAttestationsListQuery": {
            "digest": [
                3
            ],
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "MgAttestationsListResult": {
            "paging": [
                86
            ],
            "items": [
                308
            ],
            "__typename": [
                3
            ]
        },
        "MgAttestationSource": {
            "commitUrl": [
                3
            ],
            "commitSha": [
                3
            ],
            "dockerfileUrl": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "MgAttestationsQuery": {
            "digest": [
                3
            ],
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "MgAttestationsResult": {
            "buildParameters": [
                310
            ],
            "dockerfile": [
                311
            ],
            "ociConfig": [
                313
            ],
            "source": [
                319
            ],
            "__typename": [
                3
            ]
        },
        "BasePurlFields": {
            "namespace": [
                3
            ],
            "name": [
                3
            ],
            "type": [
                3
            ],
            "version": [
                3
            ],
            "qualifiers": [
                3
            ],
            "subpath": [
                3
            ],
            "on_PurlFields": [
                376
            ],
            "on_VEXPackageScope": [
                392
            ],
            "__typename": [
                3
            ]
        },
        "CreateWebhookInput": {
            "payloadUrl": [
                3
            ],
            "events": [
                408
            ],
            "signingKey": [
                3
            ],
            "active": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "DeleteWebhookResult": {
            "success": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "DhiDestinationRepository": {
            "name": [
                3
            ],
            "namespace": [
                3
            ],
            "hostname": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DhiDestinationRepositoryFilter": {
            "hostname": [
                3
            ],
            "namespace": [
                3
            ],
            "name": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DhiDestinationRepositoryInput": {
            "name": [
                3
            ],
            "namespace": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DhiGetMirroredRepositoriesBySourceRepositoryQuery": {
            "dhiSourceRepository": [
                354
            ],
            "__typename": [
                3
            ]
        },
        "DhiGetMirroredRepositoriesBySourceRepositoryResponse": {
            "mirroredRepositories": [
                339
            ],
            "__typename": [
                3
            ]
        },
        "DhiGetMirroredRepositoryQuery": {
            "mirroredRepositoryId": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DhiGetMirroredRepositoryResponse": {
            "mirroredRepository": [
                339
            ],
            "__typename": [
                3
            ]
        },
        "DhiImageManifest": {
            "manifestDigest": [
                3
            ],
            "platform": [
                3
            ],
            "distribution": [
                3
            ],
            "compressedSize": [
                19
            ],
            "packageManager": [
                3
            ],
            "shell": [
                3
            ],
            "user": [
                3
            ],
            "workingDirectory": [
                3
            ],
            "fipsCompliant": [
                12
            ],
            "stigCertified": [
                12
            ],
            "lastPushed": [
                3
            ],
            "vulnerabilities": [
                255
            ],
            "scoutHealthScore": [
                382
            ],
            "__typename": [
                3
            ]
        },
        "DhiImageTag": {
            "name": [
                3
            ],
            "lastUpdated": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DhiIndexImage": {
            "indexDigest": [
                3
            ],
            "tags": [
                333
            ],
            "imageManifests": [
                332
            ],
            "__typename": [
                3
            ]
        },
        "DhiListMirroredRepositoriesResponse": {
            "mirroredRepositories": [
                339
            ],
            "totalCount": [
                17
            ],
            "canMirrorMoreRepositories": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "DhiListMirroringLogsPagingInput": {
            "pageSize": [
                17
            ],
            "page": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "DhiListMirroringLogsQuery": {
            "destinationRepositories": [
                326
            ],
            "includedStatuses": [
                342
            ],
            "excludedStatuses": [
                342
            ],
            "triggeredSince": [
                3
            ],
            "paging": [
                336
            ],
            "__typename": [
                3
            ]
        },
        "DhiListMirroringLogsResult": {
            "items": [
                340
            ],
            "__typename": [
                3
            ]
        },
        "DhiMirroredRepository": {
            "id": [
                3
            ],
            "destinationRepository": [
                325
            ],
            "dhiSourceRepository": [
                353
            ],
            "__typename": [
                3
            ]
        },
        "DhiMirroringLog": {
            "id": [
                3
            ],
            "reason": [
                341
            ],
            "status": [
                342
            ],
            "sourceRepository": [
                353
            ],
            "destinationRepository": [
                325
            ],
            "tag": [
                3
            ],
            "digest": [
                3
            ],
            "triggeredAt": [
                3
            ],
            "pushedAt": [
                3
            ],
            "startedAt": [
                3
            ],
            "completedAt": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DhiMirroringLogReason": {},
        "DhiMirroringLogStatus": {},
        "DhiRemoveMirroredRepositoryInput": {
            "mirroredRepositoryId": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DhiRepositoriesQuery": {
            "filter": [
                345
            ],
            "__typename": [
                3
            ]
        },
        "DhiRepositoriesQueryFilter": {
            "categoryId": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DhiRepositoriesResult": {
            "items": [
                350
            ],
            "categories": [
                347
            ],
            "__typename": [
                3
            ]
        },
        "DhiRepositoryCategory": {
            "id": [
                3
            ],
            "name": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DhiRepositoryDetailsQuery": {
            "repoName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DhiRepositoryDetailsResult": {
            "name": [
                3
            ],
            "namespace": [
                3
            ],
            "displayName": [
                3
            ],
            "shortDescription": [
                3
            ],
            "featured": [
                12
            ],
            "fipsCompliant": [
                12
            ],
            "stigCertified": [
                12
            ],
            "homeUrl": [
                3
            ],
            "categories": [
                347
            ],
            "distributions": [
                3
            ],
            "platforms": [
                3
            ],
            "overview": [
                3
            ],
            "guides": [
                3
            ],
            "images": [
                334
            ],
            "__typename": [
                3
            ]
        },
        "DhiRepositorySummary": {
            "name": [
                3
            ],
            "namespace": [
                3
            ],
            "displayName": [
                3
            ],
            "shortDescription": [
                3
            ],
            "featured": [
                12
            ],
            "fipsCompliant": [
                12
            ],
            "stigCertified": [
                12
            ],
            "homeUrl": [
                3
            ],
            "categories": [
                347
            ],
            "distributions": [
                3
            ],
            "platforms": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DhiSetMirroredRepositoryInput": {
            "dhiSourceRepository": [
                354
            ],
            "destinationRepository": [
                327
            ],
            "__typename": [
                3
            ]
        },
        "DhiSetMirroredRepositoryResponse": {
            "mirroredRepository": [
                339
            ],
            "__typename": [
                3
            ]
        },
        "DhiSourceRepository": {
            "name": [
                3
            ],
            "namespace": [
                3
            ],
            "hostname": [
                3
            ],
            "displayName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DhiSourceRepositoryInput": {
            "name": [
                3
            ],
            "namespace": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DhiTagDetailsQuery": {
            "repoName": [
                3
            ],
            "tag": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "DhiTagDetailsResult": {
            "indexDigest": [
                3
            ],
            "repo": [
                3
            ],
            "tag": [
                333
            ],
            "allTags": [
                333
            ],
            "imageManifests": [
                332
            ],
            "__typename": [
                3
            ]
        },
        "ExceptionSource": {
            "on_VEXStatement": [
                393
            ],
            "on_ManualException": [
                365
            ],
            "__typename": [
                3
            ]
        },
        "ExceptionVulnerability": {
            "cveId": [
                3
            ],
            "highestSeverity": [
                21
            ],
            "highestCVSSScore": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "FullImageCoordInput": {
            "digest": [
                3
            ],
            "hostname": [
                3
            ],
            "repository": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ImageCoordInput": {
            "digest": [
                3
            ],
            "hostname": [
                3
            ],
            "repository": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ImageRepositoryResult": {
            "hostname": [
                3
            ],
            "repository": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ImagesWithPackageOrdering": {
            "field": [
                363
            ],
            "sortOrder": [
                231
            ],
            "__typename": [
                3
            ]
        },
        "ImagesWithPackageOrderingField": {},
        "ListWebhooksResult": {
            "items": [
                407
            ],
            "__typename": [
                3
            ]
        },
        "ManualException": {
            "exceptionId": [
                14
            ],
            "type": [
                32
            ],
            "author": [
                3
            ],
            "created": [
                3
            ],
            "cveId": [
                3
            ],
            "scopes": [
                395
            ],
            "justification": [
                249
            ],
            "additionalDetails": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "MutationResponse": {
            "status": [
                367
            ],
            "message": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "MutationResponseStatus": {},
        "PkImagePlatform": {
            "os": [
                3
            ],
            "architecture": [
                3
            ],
            "variant": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "PkImagesWithPackageFilter": {
            "packageVersion": [
                3
            ],
            "repoName": [
                3
            ],
            "kvs": [
                82
            ],
            "__typename": [
                3
            ]
        },
        "PkImagesWithPackageQuery": {
            "name": [
                3
            ],
            "type": [
                3
            ],
            "namespace": [
                3
            ],
            "stream": [
                3
            ],
            "paging": [
                87
            ],
            "filter": [
                369
            ],
            "ordering": [
                362
            ],
            "__typename": [
                3
            ]
        },
        "PkImagesWithPackageResponse": {
            "items": [
                372
            ],
            "paging": [
                86
            ],
            "versions": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "PkImageWithPackage": {
            "repository": [
                373
            ],
            "digest": [
                3
            ],
            "name": [
                3
            ],
            "lastPushed": [
                3
            ],
            "packageVersions": [
                3
            ],
            "platform": [
                368
            ],
            "__typename": [
                3
            ]
        },
        "PkRepository": {
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "PkRepositoryInput": {
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "PkStreamSummaryFilter": {
            "repos": [
                374
            ],
            "__typename": [
                3
            ]
        },
        "PurlFields": {
            "namespace": [
                3
            ],
            "name": [
                3
            ],
            "type": [
                3
            ],
            "version": [
                3
            ],
            "qualifiers": [
                3
            ],
            "subpath": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScCVEPackageVulnerability": {
            "name": [
                3
            ],
            "type": [
                3
            ],
            "namespace": [
                3
            ],
            "osName": [
                3
            ],
            "osVersion": [
                3
            ],
            "versions": [
                378
            ],
            "__typename": [
                3
            ]
        },
        "ScCVEPackageVulnerabilityVersion": {
            "vulnerableRange": [
                3
            ],
            "fixedBy": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScCVESource": {
            "source": [
                3
            ],
            "sourceName": [
                3
            ],
            "sourceId": [
                3
            ],
            "url": [
                3
            ],
            "description": [
                3
            ],
            "createdAt": [
                3
            ],
            "updatedAt": [
                3
            ],
            "withdrawnAt": [
                3
            ],
            "state": [
                3
            ],
            "exploitabilityScore": [
                3
            ],
            "cvss": [
                251
            ],
            "packages": [
                377
            ],
            "cwes": [
                252
            ],
            "exploits": [
                3
            ],
            "advisories": [
                3
            ],
            "patches": [
                3
            ],
            "commits": [
                3
            ],
            "info": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScCVESourcesQuery": {
            "cveId": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ScCVESourcesResult": {
            "cveId": [
                3
            ],
            "defaultSource": [
                3
            ],
            "sources": [
                379
            ],
            "epss": [
                30
            ],
            "__typename": [
                3
            ]
        },
        "ScoutHealthScore": {
            "score": [
                3
            ],
            "policies": [
                383
            ],
            "__typename": [
                3
            ]
        },
        "ScoutHealthScorePolicy": {
            "name": [
                3
            ],
            "label": [
                3
            ],
            "status": [
                384
            ],
            "description": [
                3
            ],
            "violationCount": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "ScoutHealthScorePolicyStatus": {},
        "SourceType": {},
        "StreamSummaryMode": {},
        "StreamSummaryQuery": {
            "summaryMode": [
                386
            ],
            "stream": [
                3
            ],
            "filter": [
                375
            ],
            "__typename": [
                3
            ]
        },
        "StreamSummaryResult": {
            "vulnerabilityReport": [
                255
            ],
            "__typename": [
                3
            ]
        },
        "TestWebhookResult": {
            "success": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "UpdateWebhookInput": {
            "id": [
                3
            ],
            "payloadUrl": [
                3
            ],
            "events": [
                408
            ],
            "signingKey": [
                3
            ],
            "active": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "VEXDocument": {
            "documentId": [
                14
            ],
            "documentUrl": [
                3
            ],
            "timestamp": [
                3
            ],
            "author": [
                3
            ],
            "version": [
                3
            ],
            "source": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "VEXPackageScope": {
            "purl": [
                3
            ],
            "type": [
                3
            ],
            "namespace": [
                3
            ],
            "name": [
                3
            ],
            "qualifiers": [
                3
            ],
            "version": [
                3
            ],
            "subpath": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "VEXStatement": {
            "statementId": [
                14
            ],
            "timestamp": [
                3
            ],
            "document": [
                391
            ],
            "cveId": [
                3
            ],
            "scopes": [
                395
            ],
            "status": [
                250
            ],
            "justification": [
                249
            ],
            "statusStatement": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "VEXStatementImage": {
            "digest": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "VEXStatementScope": {
            "repository": [
                361
            ],
            "image": [
                394
            ],
            "packages": [
                392
            ],
            "__typename": [
                3
            ]
        },
        "VulnerabilitiesByPackageQuery": {
            "packageUrls": [
                3
            ],
            "imageCoords": [
                360
            ],
            "includeExcepted": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "VulnerabilitiesByPackageResponse": {
            "items": [
                253
            ],
            "__typename": [
                3
            ]
        },
        "VulnerabilityException": {
            "id": [
                14
            ],
            "author": [
                3
            ],
            "timestamp": [
                3
            ],
            "vulnerability": [
                358
            ],
            "type": [
                32
            ],
            "imageScopes": [
                399
            ],
            "reason": [
                401
            ],
            "__typename": [
                3
            ]
        },
        "VulnerabilityExceptionImageScope": {
            "hostName": [
                3
            ],
            "repoName": [
                3
            ],
            "digest": [
                3
            ],
            "packageScopes": [
                400
            ],
            "__typename": [
                3
            ]
        },
        "VulnerabilityExceptionPackageScope": {
            "purl": [
                3
            ],
            "purlFields": [
                376
            ],
            "__typename": [
                3
            ]
        },
        "VulnerabilityExceptionReason": {
            "justification": [
                249
            ],
            "additionalDetails": [
                3
            ],
            "source": [
                357
            ],
            "__typename": [
                3
            ]
        },
        "VulnerabilityExceptionsApplicableToImageQuery": {
            "image": [
                359
            ],
            "filter": [
                403
            ],
            "paging": [
                87
            ],
            "__typename": [
                3
            ]
        },
        "VulnerabilityExceptionsApplicableToImageQueryFilter": {
            "orgExceptionsOnly": [
                12
            ],
            "cveIdPrefix": [
                3
            ],
            "type": [
                32
            ],
            "justification": [
                249
            ],
            "sourceType": [
                385
            ],
            "__typename": [
                3
            ]
        },
        "VulnerabilityExceptionsQuery": {
            "filter": [
                405
            ],
            "paging": [
                87
            ],
            "__typename": [
                3
            ]
        },
        "VulnerabilityExceptionsQueryFilter": {
            "hostname": [
                3
            ],
            "repository": [
                3
            ],
            "digest": [
                3
            ],
            "orgExceptionsOnly": [
                12
            ],
            "cveId": [
                3
            ],
            "cveIdPrefix": [
                3
            ],
            "type": [
                32
            ],
            "justification": [
                249
            ],
            "sourceType": [
                385
            ],
            "__typename": [
                3
            ]
        },
        "VulnerabilityExceptionsResult": {
            "items": [
                398
            ],
            "paging": [
                86
            ],
            "__typename": [
                3
            ]
        },
        "Webhook": {
            "id": [
                3
            ],
            "payloadUrl": [
                3
            ],
            "events": [
                408
            ],
            "signingKey": [
                3
            ],
            "active": [
                12
            ],
            "updatedAt": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "WebhookEvent": {},
        "AddNotificationWebhookInput": {
            "ID": [
                3
            ],
            "name": [
                3
            ],
            "webhookType": [
                429
            ],
            "url": [
                3
            ],
            "repositories": [
                3
            ],
            "filterType": [
                422
            ],
            "weeklyReportSettings": [
                431
            ],
            "streams": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "CVEVulnerabilityState": {
            "CVSSScore": [
                3
            ],
            "severity": [
                3
            ],
            "fixable": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "FeedNotification": {
            "on_NotificationNewCVE": [
                415
            ],
            "on_NotificationUpdateCVE": [
                416
            ],
            "__typename": [
                3
            ]
        },
        "GenericWebhook": {
            "ID": [
                3
            ],
            "name": [
                3
            ],
            "author": [
                418
            ],
            "updatedAt": [
                3
            ],
            "url": [
                3
            ],
            "repositories": [
                3
            ],
            "filterType": [
                422
            ],
            "streams": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ImageReference": {
            "repository": [
                3
            ],
            "impactedPackage": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "Notification": {
            "id": [
                14
            ],
            "organization": [
                3
            ],
            "title": [
                3
            ],
            "body": [
                3
            ],
            "url": [
                3
            ],
            "isRead": [
                12
            ],
            "isDismissed": [
                12
            ],
            "createdAt": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "NotificationNewCVE": {
            "event": [
                3
            ],
            "organization": [
                3
            ],
            "cve": [
                3
            ],
            "afterState": [
                410
            ],
            "numImpactedImages": [
                17
            ],
            "sampleImages": [
                413
            ],
            "createdAt": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "NotificationUpdateCVE": {
            "event": [
                3
            ],
            "organization": [
                3
            ],
            "cve": [
                3
            ],
            "beforeState": [
                410
            ],
            "afterState": [
                410
            ],
            "numImpactedImages": [
                17
            ],
            "sampleImages": [
                413
            ],
            "createdAt": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "NotificationUpdateInput": {
            "isRead": [
                12
            ],
            "isDismissed": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "NotificationWebhookAuthor": {
            "name": [
                3
            ],
            "email": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "NotificationWebhookFilterInput": {
            "webhookType": [
                429
            ],
            "__typename": [
                3
            ]
        },
        "NotificationWebhookResult": {
            "ID": [
                3
            ],
            "name": [
                3
            ],
            "author": [
                418
            ],
            "updatedAt": [
                3
            ],
            "url": [
                3
            ],
            "repositories": [
                3
            ],
            "filterType": [
                422
            ],
            "streams": [
                3
            ],
            "on_GenericWebhook": [
                412
            ],
            "on_SlackWebhook": [
                424
            ],
            "__typename": [
                3
            ]
        },
        "Repository": {
            "hostName": [
                3
            ],
            "repositoryName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "RepositoryFilterType": {},
        "RepositoryInput": {
            "hostName": [
                3
            ],
            "repositoryName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "SlackWebhook": {
            "ID": [
                3
            ],
            "name": [
                3
            ],
            "author": [
                418
            ],
            "updatedAt": [
                3
            ],
            "url": [
                3
            ],
            "repositories": [
                3
            ],
            "filterType": [
                422
            ],
            "weeklyReportEnabled": [
                12
            ],
            "weeklyReportSettings": [
                430
            ],
            "streams": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "TeamInput": {
            "team": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "UpdateNotificationWebhookInput": {
            "ID": [
                3
            ],
            "name": [
                3
            ],
            "webhookType": [
                429
            ],
            "url": [
                3
            ],
            "repositories": [
                3
            ],
            "filterType": [
                422
            ],
            "weeklyReportSettings": [
                431
            ],
            "streams": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "UserNotificationPreferencesInput": {
            "allRepositories": [
                12
            ],
            "repositories": [
                423
            ],
            "__typename": [
                3
            ]
        },
        "UserNotificationPreferencesResult": {
            "allRepositories": [
                12
            ],
            "repositories": [
                421
            ],
            "__typename": [
                3
            ]
        },
        "WebhookType": {},
        "WeeklyReportSettings": {
            "enabled": [
                12
            ],
            "excludeTopVulnerabilities": [
                12
            ],
            "excludePolicies": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "WeeklyReportSettingsInput": {
            "enabled": [
                12
            ],
            "excludeTopVulnerabilities": [
                12
            ],
            "excludePolicies": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "rsAcrResult": {
            "repositoryCount": [
                17
            ],
            "hostName": [
                3
            ],
            "status": [
                437
            ],
            "__typename": [
                3
            ]
        },
        "rsDockerHubResult": {
            "repositoryCount": [
                17
            ],
            "hostName": [
                3
            ],
            "status": [
                437
            ],
            "__typename": [
                3
            ]
        },
        "rsEcrResult": {
            "repositoryCount": [
                17
            ],
            "hostName": [
                3
            ],
            "status": [
                437
            ],
            "__typename": [
                3
            ]
        },
        "rsPageInfo": {
            "page": [
                17
            ],
            "total": [
                17
            ],
            "pageSize": [
                17
            ],
            "nextPage": [
                17
            ],
            "previousPage": [
                17
            ],
            "__typename": [
                3
            ]
        },
        "rsRegistryResult": {
            "repositoryCount": [
                17
            ],
            "hostName": [
                3
            ],
            "status": [
                437
            ],
            "on_rsAcrResult": [
                432
            ],
            "on_rsDockerHubResult": [
                433
            ],
            "on_rsEcrResult": [
                434
            ],
            "__typename": [
                3
            ]
        },
        "rsRegistryStatus": {},
        "rsRepository": {
            "name": [
                3
            ],
            "registry": [
                3
            ],
            "description": [
                3
            ],
            "createdAt": [
                3
            ],
            "updatedAt": [
                3
            ],
            "isEmpty": [
                12
            ],
            "enabled": [
                12
            ],
            "type": [
                445
            ],
            "properties": [
                444
            ],
            "__typename": [
                3
            ]
        },
        "rsRepositoryListFilter": {
            "repository": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "rsRepositoryListInput": {
            "skill": [
                447
            ],
            "filter": [
                439
            ],
            "ordering": [
                443
            ],
            "page": [
                87
            ],
            "__typename": [
                3
            ]
        },
        "rsRepositoryListResult": {
            "count": [
                17
            ],
            "pageInfo": [
                435
            ],
            "registry": [
                3
            ],
            "skill": [
                446
            ],
            "repositories": [
                438
            ],
            "__typename": [
                3
            ]
        },
        "rsRepositoryListSortField": {},
        "rsRepositoryOrdering": {
            "field": [
                442
            ],
            "order": [
                231
            ],
            "__typename": [
                3
            ]
        },
        "rsRepositoryProperties": {
            "preventDisable": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "rsRepositoryType": {},
        "rsSkill": {
            "namespace": [
                3
            ],
            "name": [
                3
            ],
            "configurationName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "rsSkillInput": {
            "namespace": [
                3
            ],
            "name": [
                3
            ],
            "configurationName": [
                3
            ],
            "__typename": [
                3
            ]
        }
    }
}
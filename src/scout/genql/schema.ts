
export type Scalars = {
    String: string,
    Boolean: boolean,
    ID: string,
    Int: number,
    Float: number,
}

export interface Query {
    /** Get images by their diff IDs. */
    imagesByDiffIds: IbMatchedImages[]
    /** Get the details for a single image digest. A null result means no image was found for the supplied digest. */
    imageDetailsByDigest: (ImageWithBaseImage | null)
    /**
     * Get the list of possible image details for a digest.
     * If the digest matches an image, returns a list of a single image details.
     * If the digest matches a manifest list or image index, returns the list of all child image details.
     */
    imageDetailsListByDigest: ImageWithBaseImage[]
    /**
     * Get the list of possible image details for a digest for images in DHI.
     * If the digest matches an image, returns a list of a single image details.
     * If the digest matches a manifest list or image index, returns the list of all child image details.
     */
    dhiImageDetailsListByDigest: ImageWithBaseImage[]
    /**
     * @deprecated No longer supported
     * Deprecated: current clients no longer use this endpoint
     * Get vulnerabilities by image digests
     */
    imageVulnerabilitiesByDigest: ScImageVulnerabilitiesByDigest
    /**
     * Get a summary of vulnerability information about a list of images. If a workspaceId is included in the context then this team
     * is searched. Otherwise searches the public database.
     */
    imageSummariesByDigest: SdImageSummary[]
    /** Get packages and layers for an image digest. Returns empty if not found. */
    imagePackagesByDigest: (IpImagePackagesByDigest | null)
    /** Get packages and layers for an image coordinates. Returns empty if not found. */
    imagePackagesForImageCoords: (IpImagePackagesForImageCoords | null)
    /** Get packages and layers for an image coordinates for images in DHI. Returns empty if not found. */
    dhiImagePackagesForImageCoords: (IpImagePackagesForImageCoords | null)
    /** Get base images by digest */
    baseImagesByDigest: BiImageLayers[]
    /** Returns detected secrets in the image of supplied digest. Returns null if no image found. */
    imageDetectedSecretsByDigest: (IdDetectedSecrets | null)
    /**
     * Returns tag recommendations for all tags the digest was ever tagged as. Optionally
     * filtered by repo
     */
    tagRecommendationsByDigest: (TrRecommendedTags | null)
    /** Returns tag recommendations for digests */
    tagRecommendationsByDigests: (TrTagRecommendationsByDigestsResult | null)
    /** Returns tag recommendations for a single repository and tag combination */
    tagRecommendationsByRepositoryAndTag: (TrRecommendedTags | null)
    /** Returns streams */
    streams: (ScStreamsResult | null)
    /** Returns vulnerability reports from a stream over time */
    streamVulnerabilityReports: (StrVulnerabilityReports | null)
    /** Returns vulnerability reports from all streams over time */
    allStreamVulnerabilityReports: (AllStrVulnerabilityReportsResult | null)
    /** Returns images for a stream */
    streamImages: (ScStreamImagesResult | null)
    /** Returns packages for a stream */
    streamGroupedPackages: (ScStreamGroupedPackagesResult | null)
    /** Returns tagged images for a repository */
    taggedImagesByRepository: (ScTaggedImagesResult | null)
    /** Returns summary of base images for a stream */
    baseImagesSummaryByStream: (ScStreamBaseImagesSummaryResult | null)
    /** Returns a summary of cves present in a stream */
    cvesByStream: (ScStreamCVEsResult | null)
    /** Returns the vulnerability exceptions present in repo/repo+tag/digest */
    vulnerabilityDocuments: (ScVEXsResult | null)
    /** Returns images used by base image for a stream */
    streamImagesByBaseImage: (ScStreamImagesByBaseImageResult | null)
    /** Returns images which are affected by a given CVE */
    imagesAffectedByCVE: (ScImagesAffectedByCVEResult | null)
    /** Returns status of an organization */
    organizationStatus: ScOrganizationStatus
    /** Returns repository details */
    repository: (IbImageRepository | null)
    /** Returns goals by digest */
    goalResultsByDigest: (ScPolicyImage | null)
    /** Returns goals by digests */
    goalResultsByDigests: ScPolicyImage[]
    /** Returns goals by initiative */
    goalResultsByInitiative: (ScPolicyStreamResult | null)
    /** Returns goals by policy */
    goalResults: (ScSinglePolicyResults | null)
    /** Returns policy summaries */
    goalResultSummaries: (ScPolicySummaryResult | null)
    /** Return recently discovered vulnerabilities and affected image count */
    recentCves: ScRecentCVEsResult
    /** Returns current user information */
    user: ScUserResult
    /** Returns a single VEX statement by ID */
    vexStatement: (ScVexStatement | null)
    /** Returns VEX statements, optionally filtered by query */
    vexStatements: ScVexStatementsQueryResult
    /** Returns the filters available for the current organization */
    orgFilters: ScOrganizationFilter[]
    serviceStatus: ServiceStatusResult
    namespaceEntitlements: NamespaceEntitlements
    repoFeatures: RepositoryFeatures
    reposFeatures: RepositoryFeatureResult[]
    listEnabledRepos: EnabledRepositoriesResult
    shouldEnableReposOnPush: ShouldEnableReposOnPushResult
    listBlockedRepos: ListBlockedReposResult
    /** Get the attestations for a given image digest */
    attestations: (MgAttestationsResult | null)
    /**
     * Get the attestations for a given image digest in the DHI organization. Allows public access to
     * attestations for DHI images.
     */
    dhiAttestations: (MgAttestationsResult | null)
    /** Get the list of attestations for a given image digest */
    attestationsList: (MgAttestationsListResult | null)
    /**
     * Get the lsit of attestations for a given image digest in the DHI organization. Allows public access to
     * the list of attestations for DHI images.
     */
    dhiAttestationsList: (MgAttestationsListResult | null)
    imagesWithPackage: PkImagesWithPackageResponse
    /** Return a summary report that includes all the images in the supplied stream */
    streamSummary: StreamSummaryResult
    /** With the optional digest, scopes vulnerabilities based on the image in question. */
    vulnerabilitiesByPackage: VpPackageVulnerability[]
    /** Like vulnerabilitiesByPackage, but scoped to the image in question */
    vulnerabilitiesByPackageForImageCoords: VulnerabilitiesByPackageResponse
    /** Returns all the sources for a cve, broken down by source */
    cveSources: (ScCVESourcesResult | null)
    vulnerabilityExceptions: VulnerabilityExceptionsResult
    vulnerabilityExceptionsApplicableToImage: VulnerabilityExceptionsResult
    vulnerabilityException: (VulnerabilityException | null)
    /** Get the list of DHI repositories, used on the cataglog page */
    dhiRepositories: DhiRepositoriesResult
    /**
     * Get a DHI repository, used on the repo page. Contains all the information for the
     * various tabs on that page. e.g. the digest/tag lists. Returns null if the repository
     * does not exist.
     */
    dhiRepositoryDetails: (DhiRepositoryDetailsResult | null)
    /**
     * Powers the top of the tag detail page, whilst the SBOM etc are taken from other sources.
     * Returns a list of the manifest images
     * Returns null if the repository or tag does not exist.
     */
    dhiTagDetails: (DhiTagDetailsResult | null)
    /** List all the mirrored repositories for an organization. */
    dhiListMirroredRepositories: DhiListMirroredRepositoriesResponse
    /** Get the details of a mirrored repository by id */
    dhiGetMirroredRepository: DhiGetMirroredRepositoryResponse
    /** Get all the mirrored repositories for a given source repository on a team */
    dhiGetMirroredRepositoriesBySourceRepository: DhiGetMirroredRepositoriesBySourceRepositoryResponse
    /** List mirroring logs for a team */
    dhiListMirroringLogs: DhiListMirroringLogsResult
    /** List webhooks for a team */
    listWebhooks: ListWebhooksResult
    /** Get a particular webhook for a team */
    getWebhook: (Webhook | null)
    notifications: Notification[]
    notificationsFeed: FeedNotification[]
    notificationsPusherChannels: Scalars['String'][]
    userNotificationPreferences: UserNotificationPreferencesResult
    notificationWebhook: (NotificationWebhookResult | null)
    notificationWebhooks: NotificationWebhookResult[]
    rsListRepositories: rsRepositoryListResult
    rsListRegistries: rsRegistryResult[]
    __typename: 'Query'
}

export interface Mutation {
    indexImage: IndexImageResult
    addImageToStream: AddImageToStreamResult
    setStreamImages: SetStreamImagesResult
    addVulnerabilityException: AddVulnerabilityExceptionResult
    updateVulnerabilityException: UpdateVulnerabilityExceptionResult
    removeVulnerabilityException: RemoveVulnerabilityExceptionResult
    enrollIntoScout: ScoutEnrollment
    setRepoVulnerabilityReporting: (VulnerabilityReportingRepoFeature | null)
    setMultiRepoVulnerabilityReporting: VulnerabilityReportingResult[]
    setEnableReposOnPush: SetEnableReposOnPushResult
    setReposBlocked: BlockedRepoResult[]
    /**
     * Set the repository to be mirrored. This will also start the mirroring process.
     * Requires owner access to the destination organization.
     * Source repository must exist.
     * Destination repository name must start with dhi-
     * Destination repository namespace must match the organization in the context.
     */
    dhiSetMirroredRepository: (DhiSetMirroredRepositoryResponse | null)
    /**
     * Remove mirroring on a repository. This will stop new images being mirrored.
     * Requires owner access to the destination organization.
     */
    dhiRemoveMirroredRepository: MutationResponse
    /** Create a webhook */
    createWebhook: Webhook
    /** Update a webhook */
    updateWebhook: Webhook
    /** Delete a webhook */
    deleteWebhook: DeleteWebhookResult
    /** Test a webhook */
    testWebhook: TestWebhookResult
    updateNotification: Notification
    dismissAllNotifications: Scalars['Boolean']
    setUserNotificationPreferences: UserNotificationPreferencesResult
    addNotificationWebhook: NotificationWebhookResult
    updateNotificationWebhook: NotificationWebhookResult
    removeNotificationWebhook: Scalars['Boolean']
    __typename: 'Mutation'
}

export interface AddImageToStreamResult {
    status: AddImageToStreamStatus
    __typename: 'AddImageToStreamResult'
}

export type AddImageToStreamStatus = 'ACCEPTED'

export interface AddVulnerabilityExceptionResult {
    exception: ScVulnerabilityException
    __typename: 'AddVulnerabilityExceptionResult'
}


/** All stream vulnerability reports */
export interface AllStrVulnerabilityReports {
    /** The stream the vulnerability report belongs to */
    stream: Scalars['String']
    /** The vulnerability reports over time */
    reports: TimestampedVulnerabilityReport[]
    __typename: 'AllStrVulnerabilityReports'
}


/** All stream vulnerability reports response */
export interface AllStrVulnerabilityReportsResult {
    /** The vulnerability reports over time grouped by stream */
    items: AllStrVulnerabilityReports[]
    __typename: 'AllStrVulnerabilityReportsResult'
}

export type BaseScPolicy = (ScBooleanPolicy | ScGenericPolicy | ScLicencePolicy | ScVulnerabilityPolicy) & { __isUnion?: true }

export type BaseScVulnerabilityExceptionSource = (ScVulnerabilityExceptionScoutSource | ScVulnerabilityExceptionVEXSource) & { __isUnion?: true }


/** Returns layer ordinals and the base images that those ordinals are for */
export interface BiImageLayers {
    /** The list of layers that the base image matches */
    layerMatches: BiLayerMatch[]
    /** A list of images which were matched. Can be multiple images if the image has been pushed to more than one repository. */
    images: IbBaseImage[]
    __typename: 'BiImageLayers'
}

export interface BiLayerMatch {
    layerOrdinal: Scalars['Int']
    layerDigest: Scalars['String']
    __typename: 'BiLayerMatch'
}

export type CommonImage = (IbBaseImage | IbImage | ImageWithBaseImage) & { __isUnion?: true }

export type CVSSSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'UNSPECIFIED'

export type CVSSVersion = 'CVSS_VERSION_2' | 'CVSS_VERSION_3' | 'CVSS_VERSION_4'


/** Holds metadata of the detected secret. */
export interface DetectedSecret {
    /** The source of the detected secret. */
    source: DetectedSecretSource
    /** The findings of the detected secret. */
    findings: SecretFinding[]
    __typename: 'DetectedSecret'
}


/** The source of the detected secret. */
export interface DetectedSecretSource {
    /** The type of the detected secret. */
    type: DetectedSecretSourceType
    /** The location of the detected secret. */
    location: (DetectedSecretSourceLocation | null)
    __typename: 'DetectedSecretSource'
}


/** The location of where the secret was detected. */
export interface DetectedSecretSourceLocation {
    /** The path of where the secret was detected. Present if the secret was found in a FILE. */
    path: (Scalars['String'] | null)
    /** The ordinal of the layer in which the secret was discovered. */
    ordinal: (Scalars['Int'] | null)
    /** The digest of the layer in which the secret was discovered. */
    digest: (Scalars['String'] | null)
    /** The diffId of the layer in which the secret was discovered. */
    diffId: (Scalars['String'] | null)
    __typename: 'DetectedSecretSourceLocation'
}


/** The type of the detected secret. */
export type DetectedSecretSourceType = 'FILE' | 'ENV' | 'LABEL' | 'HISTORY'

export interface DockerfileLine {
    number: Scalars['Int']
    __typename: 'DockerfileLine'
}

export interface DockerOrg {
    /** The name of this organization */
    name: Scalars['String']
    /** The role of the user in this organization */
    role: (DockerRole | null)
    /** The avatar url of this organization */
    avatarUrl: (Scalars['String'] | null)
    __typename: 'DockerOrg'
}

export type DockerRole = 'editor' | 'owner' | 'member' | 'user'

export interface EPSS {
    /** the epss score */
    score: Scalars['Float']
    /** the epss percentile */
    percentile: Scalars['Float']
    /**
     * The priority of the EPSS entry based on percentile.
     * >=0.9: CRITICAL
     * >=0.4: HIGH
     * >=0.05: STANDARD
     * <0.05: LOWEST
     */
    priority: EPSSPriorityCategory
    /** A description of the EPSS priority */
    priorityDescription: Scalars['String']
    __typename: 'EPSS'
}


/**
 * Applies a category to EPSS percentiles
 * >=0.9: CRITICAL
 * >=0.4: HIGH
 * >=0.05: STANDARD
 * <0.05: LOWEST
 */
export type EPSSPriorityCategory = 'LOWEST' | 'STANDARD' | 'HIGH' | 'CRITICAL'

export type ExceptionType = 'ACCEPTED_RISK' | 'FALSE_POSITIVE'

export type IbAttestation = (IbAttestationGeneric | IbAttestationProvenance) & { __isUnion?: true }


/**
 * Implementation for attestations that don't
 * have specific fields or that we don't
 * handle yet.
 */
export interface IbAttestationGeneric {
    /** The predicate type of the attestation */
    predicateType: Scalars['String']
    __typename: 'IbAttestationGeneric'
}

export interface IbAttestationProvenance {
    /** The predicate type of the attestation */
    predicateType: Scalars['String']
    base: (IbBaseImageProvenance | null)
    dockerfile: (IbDockerfileProvenance | null)
    git: (IbGitProvenance | null)
    materials: IbMaterialProvenance[]
    /** The BuildKit provenance mode */
    mode: IbBuildKitProvenanceMode
    __typename: 'IbAttestationProvenance'
}


/** This type represents a base Docker image. */
export interface IbBaseImage {
    /** The digest of this image. */
    digest: Scalars['ID']
    /** A list of tags associated with this image. */
    tags: IbTag[]
    /** The creation date of this image represented as an ISO8601 string. */
    createdAt: Scalars['String']
    /** The number of packages present on this image (if known). */
    packageCount: (Scalars['Int'] | null)
    /** The Dockerfile associated with this image (if known). */
    dockerFile: (IbDockerFile | null)
    /** A report of any vulnerabilities this image associated with this image. */
    vulnerabilityReport: (IbVulnerabilityReport | null)
    /** The repository that this image belongs to. */
    repository: IbImageRepository
    /** The state of SBOM generation for this image */
    sbomState: SBOMState
    /** The number of changesets (histories|layers) this image contains */
    layerCount: (Scalars['Int'] | null)
    /** The image os and architecture */
    platform: (IbImagePlatform | null)
    /** The compressed size of the image */
    compressedSize: (Scalars['Float'] | null)
    /** The labels for this image */
    labels: IbLabel[]
    /** The media type of the manifest */
    mediaType: (Scalars['String'] | null)
    /**
     * The provenance attestation containing the remaining information
     * which allows us to know exactly how this base was referenced
     * in the original image
     */
    provenanceAttestation: (IbProvenanceAttestation | null)
    __typename: 'IbBaseImage'
}

export interface IbBaseImageProvenance {
    digest: (Scalars['String'] | null)
    platform: (IbImagePlatform | null)
    repository: (Scalars['String'] | null)
    tag: (Scalars['String'] | null)
    __typename: 'IbBaseImageProvenance'
}

export type IbBuildKitProvenanceMode = 'MIN' | 'MAX'


/** This type represents the Dockerfile which was used to build an image. */
export interface IbDockerFile {
    /** The path to the Dockerfile within a Git repo. */
    path: Scalars['String']
    /** The commit at which this Dockerfile was used to build the image (if known). */
    commit: (IbGitCommit | null)
    __typename: 'IbDockerFile'
}

export interface IbDockerfileProvenance {
    /** The sha of the Dockerfile */
    sha: Scalars['String']
    __typename: 'IbDockerfileProvenance'
}


/** This type represents a Git commit. */
export interface IbGitCommit {
    /** The SHA of the commit. */
    sha: Scalars['String']
    /** The repository on which the commit was made (if known). */
    repository: (IbGitRepository | null)
    __typename: 'IbGitCommit'
}

export interface IbGithubPullRequest {
    providerUrl: Scalars['String']
    sourceId: Scalars['String']
    author: (IbGitUser | null)
    createdAt: (Scalars['String'] | null)
    destinationRef: IbGitRef
    mergedBy: (IbGitUser | null)
    requestedReviewers: IbGitUser[]
    sourceRef: IbGitRef
    state: (Scalars['String'] | null)
    url: (Scalars['String'] | null)
    __typename: 'IbGithubPullRequest'
}

export interface IbGitOrg {
    name: Scalars['String']
    __typename: 'IbGitOrg'
}

export interface IbGitProvenance {
    /** The url for the git commit; only handles GitHub at the moment */
    commitUrl: (Scalars['String'] | null)
    /** The sha of the git commit */
    sha: Scalars['String']
    /** The source of the git commit */
    source: Scalars['String']
    __typename: 'IbGitProvenance'
}

export type IbGitPullRequest = (IbGithubPullRequest) & { __isUnion?: true }

export interface IbGitRef {
    name: Scalars['String']
    repo: IbGitRepo
    type: IbGitRefType
    __typename: 'IbGitRef'
}

export type IbGitRefType = 'BRANCH' | 'TAG'

export interface IbGitRepo {
    name: Scalars['String']
    org: IbGitOrg
    __typename: 'IbGitRepo'
}


/** This type represents a Git repository. */
export interface IbGitRepository {
    /** The name of the organization in which the Git repository belongs. */
    orgName: Scalars['String']
    /** The name of the repository. */
    repoName: Scalars['String']
    __typename: 'IbGitRepository'
}

export interface IbGitUser {
    username: (Scalars['String'] | null)
    __typename: 'IbGitUser'
}


/** This type represents a Docker image. */
export interface IbImage {
    /** The digest of this image. */
    digest: Scalars['ID']
    /** A list of tags associated with this image. */
    tags: IbTag[]
    /** The creation date of this image represented as an ISO8601 string. */
    createdAt: Scalars['String']
    /** The number of packages present on this image (if known). */
    packageCount: (Scalars['Int'] | null)
    /** The Dockerfile associated with this image (if known). */
    dockerFile: (IbDockerFile | null)
    /** A report of any vulnerabilities this image associated with this image. */
    vulnerabilityReport: (IbVulnerabilityReport | null)
    /** The repository that this image belongs to. */
    repository: IbImageRepository
    /** The state of SBOM generation for this image */
    sbomState: SBOMState
    /** The number of changesets (histories|layers) this image contains */
    layerCount: (Scalars['Int'] | null)
    /** The list of changesets (layer|history) of the image */
    changesets: ScImageChangeset[]
    /** The image os and architecture */
    platform: (IbImagePlatform | null)
    /** The compressed size of the image */
    compressedSize: (Scalars['Float'] | null)
    /** The labels for this image */
    labels: IbLabel[]
    /** The media type of the manifest */
    mediaType: (Scalars['String'] | null)
    __typename: 'IbImage'
}

export interface IbImagePlatform {
    /** The OS (Operating System) of the image, eg. linux */
    os: Scalars['String']
    /** The chip architecture of the image, eg. arm64 */
    architecture: Scalars['String']
    /** The OS variant of the image */
    variant: (Scalars['String'] | null)
    __typename: 'IbImagePlatform'
}


/** This type represents a Docker image repository. */
export interface IbImageRepository {
    /** The hostname of the repository. */
    hostName: Scalars['String']
    /** The name of the repository. */
    repoName: Scalars['String']
    /** An optional badge describing the repository's status. */
    badge: (IbImageRepositoryBadge | null)
    /** A list of the repository's supported tags */
    supportedTags: Scalars['String'][]
    /** A list of the repository's preferred tags */
    preferredTags: Scalars['String'][]
    /** The description of the repository */
    description: (Scalars['String'] | null)
    /** Pull count if they are available */
    pullCount: (Scalars['Float'] | null)
    /** Star count if available */
    starCount: (Scalars['Int'] | null)
    /** List of platforms in the repository, if available */
    platforms: ((Scalars['String'] | null)[] | null)
    /** The digest of the previously scanned image or index (if any) */
    previousScannedDigest: (Scalars['String'] | null)
    __typename: 'IbImageRepository'
}


/** This enum represents badges which give additional information on the status of a repository. */
export type IbImageRepositoryBadge = 'OFFICIAL_IMAGE' | 'OPEN_SOURCE' | 'VERIFIED_PUBLISHER'


/** This type represents a label for an image */
export interface IbLabel {
    /** The key of the label */
    key: Scalars['String']
    /** The value of the label */
    value: Scalars['String']
    __typename: 'IbLabel'
}


/** This type lists the images which were matched against the input ID matches which were used to generate the chain ID which found them. */
export interface IbMatchedImages {
    /** A list of input IDs (depending on the query used) which were used to generate the chain ID under which the images were found. */
    matches: Scalars['ID'][]
    /** A list of images which were matched. */
    images: IbImage[]
    __typename: 'IbMatchedImages'
}

export interface IbMaterialProvenance {
    /** The digest of the material */
    digest: Scalars['String']
    /** The uri of the material */
    uri: Scalars['String']
    __typename: 'IbMaterialProvenance'
}

export interface IbProvenanceAttestation {
    digest: (Scalars['String'] | null)
    tag: (Scalars['String'] | null)
    repository: (Scalars['String'] | null)
    __typename: 'IbProvenanceAttestation'
}


/**
 * This type represents a tag which is associated with an image, either directly
 * or indirectly (via an image index).
 */
export interface IbTag {
    /** The name of the tag. */
    name: Scalars['String']
    /** A timestamp indicating when this tag was last updated (if available) */
    updatedAt: (Scalars['String'] | null)
    /** Whether this tag currently points to this image. */
    current: Scalars['Boolean']
    /** Whether this tag appears in the list of supported tags. */
    supported: Scalars['Boolean']
    /** The digest of the image, or image index, the tag is directly associated with (if current). */
    digest: (Scalars['String'] | null)
    /** The media type of the image, or image index, the tag is directly associated with (if current). */
    mediaType: (Scalars['String'] | null)
    __typename: 'IbTag'
}


/** This type represents a vulnerability report about an image. */
export interface IbVulnerabilityReport {
    /** The number of critical severity vulnerabilities present in the image. */
    critical: Scalars['Int']
    /** The number of high severity vulnerabilities present in the image. */
    high: Scalars['Int']
    /** The number of medium severity vulnerabilities present in the image. */
    medium: Scalars['Int']
    /** The number of low severity vulnerabilities present in the image. */
    low: Scalars['Int']
    /** The number of vulnerabilities with an unspecified severity present in the image. */
    unspecified: Scalars['Int']
    /** The total number of vulnerabilities present in the image. */
    total: Scalars['Int']
    __typename: 'IbVulnerabilityReport'
}


/** The detected secrets for the supplied image digest */
export interface IdDetectedSecrets {
    /** Get base images by digest */
    digest: Scalars['String']
    /** Any secrets found on the image. Empty if none found. */
    secrets: DetectedSecret[]
    __typename: 'IdDetectedSecrets'
}

export interface ImageHistory {
    /**
     * Indicate if this is an empty layer (without any attached blob) or not
     * If emptyLayer is true, layer will not be set
     */
    emptyLayer: Scalars['Boolean']
    /** The layer details if not empty */
    layer: (ImageLayer | null)
    /** The history ordinal */
    ordinal: Scalars['Int']
    /** The creation date of this history entry represented as an ISO8601 string. */
    createdAt: Scalars['String']
    /** Instruction to create this history entry */
    createdBy: (Scalars['String'] | null)
    __typename: 'ImageHistory'
}

export interface ImageLayer {
    /** The digest of the layer blob */
    digest: Scalars['String']
    /** Media Type of the blob */
    mediaType: Scalars['String']
    /** The diff-id of the image layer */
    diffId: Scalars['String']
    /** The dockerfile lines which created this layer */
    fileLines: DockerfileLine[]
    /** Size of the layer blob */
    size: Scalars['Float']
    __typename: 'ImageLayer'
}

export interface ImageWithBaseImage {
    /** The digest of this image. */
    digest: Scalars['ID']
    /** A list of tags associated with this image. */
    tags: IbTag[]
    /** The creation date of this image represented as an ISO8601 string. */
    createdAt: Scalars['String']
    /** The number of packages present on this image (if known). */
    packageCount: (Scalars['Int'] | null)
    /** The Dockerfile associated with this image (if known). */
    dockerFile: (IbDockerFile | null)
    /** A report of any vulnerabilities this image associated with this image. */
    vulnerabilityReport: (IbVulnerabilityReport | null)
    /** The repository that this image belongs to. */
    repository: IbImageRepository
    /** The state of SBOM generation for this image */
    sbomState: SBOMState
    /** The number of changesets (histories|layers) this image contains */
    layerCount: (Scalars['Int'] | null)
    /** The image os and architecture */
    platform: (IbImagePlatform | null)
    /** The base image of this image */
    baseImage: (IbImage | null)
    /** The base image tag that was used */
    baseImageTag: (IbTag | null)
    /** The list of histories of the image */
    histories: (ImageHistory[] | null)
    /** The list of changesets (layer|history) of the image */
    changesets: ScImageChangeset[]
    /** The list of streams this image is present in */
    streams: (ScStream[] | null)
    /** The compressed size of the image */
    compressedSize: (Scalars['Float'] | null)
    /** The labels for this image */
    labels: IbLabel[]
    /** The media type of the manifest */
    mediaType: (Scalars['String'] | null)
    /** The attestations for this image */
    attestations: IbAttestation[]
    /** The user this image uses */
    user: (Scalars['String'] | null)
    __typename: 'ImageWithBaseImage'
}

export interface IndexImageResult {
    digest: Scalars['String']
    __typename: 'IndexImageResult'
}


/** An image layer */
export interface IpImageLayer {
    /**
     * For reasons that appear to be lost to time, this is actually the blob/digest, NOT the
     * blob/diffId. As far as I know the blob digest represents the digest of the compressed
     * change, whereas the diffId represents the digest of the uncompressed layer tar.
     */
    diffId: Scalars['String']
    /** The layer ordinal */
    ordinal: Scalars['Int']
    __typename: 'IpImageLayer'
}


/** Contains a list of image layers */
export interface IpImageLayers {
    /** The list of image layers */
    layers: IpImageLayer[]
    __typename: 'IpImageLayers'
}


/** An image package */
export interface IpImagePackage {
    /** The package details */
    package: Package
    /**
     * The locations that the package appears in. A package is often found in multiple locations
     * in a docker image
     */
    locations: PackageLocation[]
    __typename: 'IpImagePackage'
}


/** Contains a list of image packages */
export interface IpImagePackages {
    /** The list of image packages */
    packages: IpImagePackage[]
    __typename: 'IpImagePackages'
}


/** Contains the packages and layers for an image */
export interface IpImagePackagesByDigest {
    /** The digest of the docker image */
    digest: Scalars['String']
    /** The indexing state of the image with the supplied digest */
    sbomState: SBOMState
    /** Holds the packages that the docker image contains */
    imagePackages: IpImagePackages
    /** Holds the layers that make up the docker image */
    imageLayers: IpImageLayers
    /** The list of histories of the image */
    imageHistories: (ImageHistory[] | null)
    __typename: 'IpImagePackagesByDigest'
}


/** Contains the packages and layers for an image */
export interface IpImagePackagesForImageCoords {
    /** The digest of the docker image */
    digest: Scalars['String']
    hostName: Scalars['String']
    repoName: Scalars['String']
    /** The indexing state of the image with the supplied digest */
    sbomState: SBOMState
    /** Holds the packages that the docker image contains */
    imagePackages: IpImagePackages
    /** Holds the layers that make up the docker image */
    imageLayers: IpImageLayers
    /** The list of histories of the image */
    imageHistories: (ImageHistory[] | null)
    __typename: 'IpImagePackagesForImageCoords'
}


/** The severity of a discovered secret. */
export type MatchedSecretSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'


/** A package */
export interface Package {
    /** The name of the package */
    name: (Scalars['String'] | null)
    /** An optional description of a package */
    description: (Scalars['String'] | null)
    /** The package url */
    purl: Scalars['String']
    /** The package purl fields */
    purlFields: ScPurl
    /** The type of the package */
    type: Scalars['String']
    /** The namespace of the package */
    namespace: (Scalars['String'] | null)
    /** The version of the package */
    version: Scalars['String']
    /** The optional author of a package */
    author: (Scalars['String'] | null)
    /** An optional list of package licenses */
    licenses: Scalars['String'][]
    /** A list of vulnerabilities that this package is vulnerable to */
    vulnerabilities: VpVulnerability[]
    __typename: 'Package'
}


/** The location of a package */
export interface PackageLocation {
    /** The path of the package */
    path: Scalars['String']
    /** The diffId of the layer that owns this location */
    diffId: Scalars['String']
    __typename: 'PackageLocation'
}

export interface Paging {
    /** The total number of items if available */
    totalCount: (Scalars['Int'] | null)
    __typename: 'Paging'
}

export interface PkVexStatement {
    /** The author of the exception - present if MANUAL_EXCEPTION and was set */
    author: (Scalars['String'] | null)
    /** The timestamp of the exception */
    timestamp: Scalars['String']
    /** The source type of the exception, VEX_STATEMENT or MANUAL_EXCEPTION */
    sourceType: PkVulnerabilityExceptionSourceType
    /** The id of the exception, used with sourceType to identify and lookup the exception details */
    id: Scalars['String']
    /** The type of the exception */
    type: ExceptionType
    /** The justification for the exception */
    justification: (VEXStatementJustification | null)
    /** The URL of the document that contains the exception if type is VEX_STATEMENT */
    documentUrl: (Scalars['String'] | null)
    /** The status of the exception, only present if sourceType is VEX_STATEMENT */
    status: (VEXStatementStatus | null)
    /**
     * Additional details about the exception, only present if sourceType is MANUAL_EXCEPTION
     * although is an optional field so may be null regardless
     */
    additionalDetails: (Scalars['String'] | null)
    __typename: 'PkVexStatement'
}

export interface PkVulnerabilityException {
    /** The author of the exception - present if MANUAL_EXCEPTION and was set */
    author: (Scalars['String'] | null)
    /** The timestamp of the exception */
    timestamp: Scalars['String']
    /** The source type of the exception, VEX_STATEMENT or MANUAL_EXCEPTION */
    sourceType: PkVulnerabilityExceptionSourceType
    /** The id of the exception, used with sourceType to identify and lookup the exception details */
    id: Scalars['String']
    /** The type of the exception */
    type: ExceptionType
    /** The justification for the exception */
    justification: (VEXStatementJustification | null)
    /** The URL of the document that contains the exception if type is VEX_STATEMENT */
    documentUrl: (Scalars['String'] | null)
    /** The status of the exception, only present if sourceType is VEX_STATEMENT */
    status: (VEXStatementStatus | null)
    /**
     * Additional details about the exception, only present if sourceType is MANUAL_EXCEPTION
     * although is an optional field so may be null regardless
     */
    additionalDetails: (Scalars['String'] | null)
    __typename: 'PkVulnerabilityException'
}

export type PkVulnerabilityExceptionSourceType = 'VEX_STATEMENT' | 'MANUAL_EXCEPTION'

export interface RemoveVulnerabilityExceptionResult {
    ids: Scalars['ID'][]
    __typename: 'RemoveVulnerabilityExceptionResult'
}


/** The state of the SBOM for a docker image. */
export type SBOMState = 'INDEXED' | 'INDEXING' | 'INDEXING_FAILED' | 'INDEXING_UNAVAILABLE' | 'NONE'

export interface ScBaseImageSummary {
    /** The repository of these base images. */
    repository: IbImageRepository
    /** The number of different images used as base images from this repository. */
    imageCount: Scalars['Int']
    /** The number of images using one of those base images. */
    childImageCount: Scalars['Int']
    /** Range of packages across the base images. */
    packages: ScPackageRange
    __typename: 'ScBaseImageSummary'
}

export interface ScBooleanPolicy {
    /** Name of the policy definition */
    definitionName: Scalars['String']
    /** Name of the policy configuration */
    configurationName: Scalars['String']
    /** Display name of the configured policy */
    displayName: (Scalars['String'] | null)
    /** Human-readable description of the configured policy */
    description: (Scalars['String'] | null)
    /** Whether policy has been evaluated */
    evaluated: Scalars['Boolean']
    /** The latest result of evaluating the policy */
    currentResult: (ScBooleanPolicyResult | null)
    /** The latest delta for the policy, regardless of reason (the change in policy results since the specified timestamp) */
    latestDelta: (ScPolicyDelta | null)
    /**
     * "
     * The available remediations for this policy result
     */
    remediations: ScRemediation[]
    __typename: 'ScBooleanPolicy'
}

export interface ScBooleanPolicyResult {
    statusLabel: Scalars['String']
    createdDateTime: Scalars['String']
    hasDeviation: Scalars['Boolean']
    deviation: (ScPolicyResultGenericDeviation | null)
    /** If changes have been made to the policy that haven't been evaluated */
    isStale: (Scalars['Boolean'] | null)
    __typename: 'ScBooleanPolicyResult'
}

export interface ScDockerRepository {
    /** Hostname of the Docker registry */
    hostName: Scalars['String']
    /** Name of the Docker repository */
    repoName: Scalars['String']
    __typename: 'ScDockerRepository'
}

export interface ScGenericPolicy {
    /** Name of the policy definition */
    definitionName: Scalars['String']
    /** Name of the policy configuration */
    configurationName: Scalars['String']
    /** Display name of the configured policy */
    displayName: (Scalars['String'] | null)
    /** Human-readable description of the configured policy */
    description: (Scalars['String'] | null)
    /** Whether policy has been evaluated */
    evaluated: Scalars['Boolean']
    /** The latest result of evaluating the policy */
    currentResult: (ScGenericPolicyResult | null)
    /** The latest delta for the policy, regardless of reason (the change in policy results since the specified timestamp) */
    latestDelta: (ScPolicyDelta | null)
    /**
     * "
     * The available remediations for this policy result
     */
    remediations: ScRemediation[]
    /** Link to docs about remediating policy violations */
    remediationLink: (Scalars['String'] | null)
    __typename: 'ScGenericPolicy'
}

export interface ScGenericPolicyResult {
    statusLabel: Scalars['String']
    deviations: ScPolicyResultGenericDeviation[]
    deviationCount: Scalars['Int']
    createdDateTime: Scalars['String']
    /** If changes have been made to the policy that haven't been evaluated */
    isStale: (Scalars['Boolean'] | null)
    __typename: 'ScGenericPolicyResult'
}

export interface ScGroupedPackage {
    /** The package root (without the version) */
    packageRoot: ScPackageRoot
    /** Number of used package versions with this packageRoot */
    versionCount: Scalars['Int']
    /**
     * @deprecated No longer supported
     * Deprecated: Use imageCount instead and imagesWithPackage for more detail
     * This will return an empty list
     */
    repositories: ScDockerRepository[]
    uniqueVulnerabilityReport: VulnerabilityReport
    /**
     * @deprecated No longer supported
     * Deprecated: Use imageCount instead and imagesWithPackage for more detail
     * This will return an empty list
     */
    images: ScImageRepository[]
    /** The number of images that use this package */
    imageCount: Scalars['Int']
    __typename: 'ScGroupedPackage'
}

export type ScGroupedPackagesOrderingField = 'VERSIONS_USED' | 'USED_BY' | 'NAME' | 'TYPE'

export interface ScImageAffectedByCVE {
    /** The affected image */
    affectedImage: ImageWithBaseImage
    /** The affected packages for the associated image */
    affectedPackages: ScImageAffectedByCVEPackage[]
    __typename: 'ScImageAffectedByCVE'
}

export interface ScImageAffectedByCVEChangeset {
    /** The changeset ordinal */
    ordinal: Scalars['Int']
    __typename: 'ScImageAffectedByCVEChangeset'
}

export interface ScImageAffectedByCVEPackage {
    /** The version of the package */
    version: Scalars['String']
    /** The namespace of the package */
    namespace: (Scalars['String'] | null)
    /** The name of the package */
    name: (Scalars['String'] | null)
    /** The operating system name of the package, if applicable */
    osName: (Scalars['String'] | null)
    /** The operating system version of the package, if applicable */
    osVersion: (Scalars['String'] | null)
    /** The type of the package */
    type: Scalars['String']
    /** The packageUrl or purl */
    purl: Scalars['String']
    /** The changeset that this package is included in */
    changesets: ScImageAffectedByCVEChangeset[]
    /**
     * @deprecated No longer supported
     * Deprecated: This is no longer part of this api and will return an empty list for the sake of
     * not breaking any existing clients
     */
    locations: Scalars['String'][]
    __typename: 'ScImageAffectedByCVEPackage'
}


/**
 * This type represents an image changeset, which is one of the following
 * * history with an empty layer
 * * history with a layer
 * * layer without a history
 */
export interface ScImageChangeset {
    history: (ScImageHistory | null)
    layer: (ScImageLayer | null)
    ordinal: Scalars['Int']
    __typename: 'ScImageChangeset'
}

export interface ScImageHistory {
    createdAt: Scalars['String']
    createdBy: Scalars['String']
    __typename: 'ScImageHistory'
}

export interface ScImageLayer {
    digest: Scalars['String']
    mediaType: Scalars['String']
    size: Scalars['Float']
    __typename: 'ScImageLayer'
}

export interface ScImageRepository {
    digest: Scalars['String']
    repository: ScDockerRepository
    __typename: 'ScImageRepository'
}

export type ScImagesAffectedByCVEOrderingField = 'LAST_PUSHED' | 'REPO_NAME'

export interface ScImagesAffectedByCVEResult {
    /** Paging of the images */
    paging: Paging
    /** The images affected by the CVE */
    items: ScImageAffectedByCVE[]
    /** The total number of unique packages affected across the stream */
    packageCount: Scalars['Int']
    __typename: 'ScImagesAffectedByCVEResult'
}

export interface ScImageVulnerabilitiesByDigest {
    digest: Scalars['String']
    vulnerabilities: VpPackageVulnerability[]
    __typename: 'ScImageVulnerabilitiesByDigest'
}

export interface ScInformationRemediation {
    id: Scalars['String']
    acceptedBy: (Scalars['String'] | null)
    changesets: ScRemediationChangeset[]
    createdAt: Scalars['String']
    details: ScRemediationDetail[]
    errors: ScRemediationError[]
    kind: (Scalars['String'] | null)
    score: (Scalars['Int'] | null)
    state: ScRemediationState
    updatedAt: Scalars['String']
    __typename: 'ScInformationRemediation'
}

export interface ScLicencePolicy {
    /** Name of the policy definition */
    definitionName: Scalars['String']
    /** Name of the policy configuration */
    configurationName: Scalars['String']
    /** Display name of the configured policy */
    displayName: (Scalars['String'] | null)
    /** Human-readable description of the configured policy */
    description: (Scalars['String'] | null)
    /** Whether policy has been evaluated */
    evaluated: Scalars['Boolean']
    /** The list of licenses that the configured policy checks for */
    licenses: Scalars['String'][]
    /** The latest result of evaluating the policy */
    currentResult: (ScLicencePolicyResult | null)
    /** The latest delta for the policy, regardless of reason (the change in policy results since the specified timestamp) */
    latestDelta: (ScPolicyDelta | null)
    /**
     * "
     * The available remediations for this policy result
     */
    remediations: ScRemediation[]
    __typename: 'ScLicencePolicy'
}

export interface ScLicencePolicyResult {
    statusLabel: Scalars['String']
    deviations: ScPolicyResultLicenceDeviation[]
    deviationCount: Scalars['Int']
    createdDateTime: Scalars['String']
    /** If changes have been made to the policy that haven't been evaluated */
    isStale: (Scalars['Boolean'] | null)
    __typename: 'ScLicencePolicyResult'
}

export interface ScOrganizationFilter {
    name: Scalars['String']
    values: Scalars['String'][]
    __typename: 'ScOrganizationFilter'
}

export interface ScOrganizationStatus {
    /** Whether the organization has any image analysis enabled */
    hasImageAnalysisEnabled: Scalars['Boolean']
    /** Whether the organization has any images which have been analyzed */
    hasAnalyzedImages: Scalars['Boolean']
    /** Whether the organization has ever had any images which have been analyzed */
    hasEverAnalyzedImages: Scalars['Boolean']
    /** The timestamp at which the last repository enablement change happened for the organization (in ISO8601 format) */
    lastRepoEnablementChangeAt: (Scalars['String'] | null)
    __typename: 'ScOrganizationStatus'
}

export interface ScPackageRange {
    /** Min number of packages across a set of images. */
    minCount: Scalars['Int']
    /** Max number of packages across a set of images. */
    maxCount: Scalars['Int']
    __typename: 'ScPackageRange'
}

export interface ScPackageRoot {
    /** The name of the package */
    name: (Scalars['String'] | null)
    /** The type of the package */
    type: Scalars['String']
    /** The namespace of the package */
    namespace: (Scalars['String'] | null)
    __typename: 'ScPackageRoot'
}

export interface ScPolicyDelta {
    deltaReason: ScPolicyDeltaReason
    deltaChange: Scalars['Int']
    __typename: 'ScPolicyDelta'
}

export type ScPolicyDeltaReason = 'external' | 'image'

export interface ScPolicyImage {
    /** The digest of the image */
    digest: Scalars['String']
    /** The tags associated with the image */
    tags: IbTag[]
    /** The repo associated with the image */
    repository: ScPolicyRepo
    /** The creation date of this image represented as an ISO8601 string. */
    createdAt: Scalars['String']
    /** The platform of the image */
    platform: (IbImagePlatform | null)
    /** The results of policy evaluation for this image */
    policies: BaseScPolicy[]
    __typename: 'ScPolicyImage'
}

export interface ScPolicyInfo {
    /** Name of the policy definition */
    definitionName: Scalars['String']
    /** Name of the policy configuration */
    configurationName: Scalars['String']
    /** Display name of the configured policy */
    displayName: (Scalars['String'] | null)
    /** Human-readable description of the configured policy */
    description: (Scalars['String'] | null)
    /** The type of deviations this policy tracks (vulnerabilities, licensed packages, boolean) */
    resultType: Scalars['String']
    /** Who this policy is owned and configured by */
    owner: ScPolicyOwner
    /** Is this policy currently enabled */
    enabled: Scalars['Boolean']
    /** Link to docs about remediating policy violations */
    remediationLink: (Scalars['String'] | null)
    __typename: 'ScPolicyInfo'
}

export type ScPolicyOwner = 'DOCKER' | 'USER'

export interface ScPolicyPackageLocation {
    layerOrdinal: Scalars['Int']
    path: Scalars['String']
    __typename: 'ScPolicyPackageLocation'
}

export interface ScPolicyRepo {
    /** The host name of the repo */
    hostName: Scalars['String']
    /** The name of the repo */
    repoName: Scalars['String']
    __typename: 'ScPolicyRepo'
}

export interface ScPolicyResultGenericDeviation {
    id: Scalars['String']
    details: ScPolicyResultGenericDeviationDetail[]
    __typename: 'ScPolicyResultGenericDeviation'
}

export interface ScPolicyResultGenericDeviationDetail {
    key: Scalars['String']
    value: Scalars['String']
    displayName: Scalars['String']
    __typename: 'ScPolicyResultGenericDeviationDetail'
}

export interface ScPolicyResultLicenceDeviation {
    id: Scalars['String']
    purl: Scalars['String']
    license: Scalars['String']
    locations: ScPolicyPackageLocation[]
    __typename: 'ScPolicyResultLicenceDeviation'
}

export interface ScPolicyResultVulnerabilityDeviation {
    id: Scalars['String']
    vulnerability: Scalars['String']
    purl: Scalars['String']
    severity: CVSSSeverity
    cvssScore: (Scalars['String'] | null)
    fixedBy: (Scalars['String'] | null)
    locations: ScPolicyPackageLocation[]
    __typename: 'ScPolicyResultVulnerabilityDeviation'
}

export type ScPolicyState = 'compliant' | 'noncompliant' | 'unknown'

export interface ScPolicyStream {
    /** The latest image for this policy stream */
    latestImage: ScPolicyImage
    /** The policies of this stream */
    policies: BaseScPolicy[]
    __typename: 'ScPolicyStream'
}

export interface ScPolicyStreamResult {
    /** The paging of the policy stream result */
    paging: Paging
    /** The matching results */
    items: ScPolicyStream[]
    __typename: 'ScPolicyStreamResult'
}

export interface ScPolicySummary {
    /** The policy that this summary is for */
    policy: ScPolicyInfo
    /** The stream that this summary is for */
    stream: Scalars['String']
    /** The total number of images that have results for this policy */
    totalImages: Scalars['Int']
    /** The number of images that are compliant with this policy */
    compliantImages: Scalars['Int']
    /** The sum of all deviations for all images for this policy */
    totalDeviations: Scalars['Int']
    /** The number of images that have unknown compliance */
    unknownImages: Scalars['Int']
    /** The policy summary delta (the change in policy results since the specified timestamp) */
    delta: ScPolicySummaryDelta
    __typename: 'ScPolicySummary'
}

export interface ScPolicySummaryDelta {
    /** The change in number of compliant images */
    compliantImages: Scalars['Int']
    /** The change in total number of deviations */
    totalDeviations: Scalars['Int']
    /** The change in total number of images */
    totalImages: Scalars['Int']
    /** The change in number of images that have unknown compliance */
    unknownImages: Scalars['Int']
    /** The point in time that the delta is calculated from */
    timestamp: Scalars['String']
    __typename: 'ScPolicySummaryDelta'
}

export interface ScPolicySummaryResult {
    /** The matching results */
    items: ScPolicySummary[]
    __typename: 'ScPolicySummaryResult'
}

export interface ScPullRequestRemediation {
    id: Scalars['String']
    acceptedBy: (Scalars['String'] | null)
    changesets: ScRemediationChangeset[]
    createdAt: Scalars['String']
    details: ScRemediationDetail[]
    errors: ScRemediationError[]
    kind: (Scalars['String'] | null)
    score: (Scalars['Int'] | null)
    state: ScRemediationState
    updatedAt: Scalars['String']
    pullRequest: (IbGitPullRequest | null)
    __typename: 'ScPullRequestRemediation'
}

export interface ScPurl {
    namespace: (Scalars['String'] | null)
    name: Scalars['String']
    type: Scalars['String']
    version: (Scalars['String'] | null)
    qualifiers: (Scalars['String'] | null)
    subpath: (Scalars['String'] | null)
    __typename: 'ScPurl'
}

export interface ScRecentCVE {
    cveId: Scalars['String']
    highestSeverity: CVSSSeverity
    highestCVSSScore: (Scalars['String'] | null)
    detectedInCount: Scalars['Int']
    publishedAt: Scalars['String']
    __typename: 'ScRecentCVE'
}

export interface ScRecentCVEsResult {
    items: ScRecentCVE[]
    __typename: 'ScRecentCVEsResult'
}

export type ScRemediation = (ScInformationRemediation | ScPullRequestRemediation) & { __isUnion?: true }

export interface ScRemediationChangeset {
    id: Scalars['String']
    message: (Scalars['String'] | null)
    patches: ScRemediationChangesetPatches[]
    __typename: 'ScRemediationChangeset'
}

export interface ScRemediationChangesetPatches {
    file: Scalars['String']
    patch: Scalars['String']
    __typename: 'ScRemediationChangesetPatches'
}

export interface ScRemediationDetail {
    key: Scalars['String']
    value: Scalars['String']
    __typename: 'ScRemediationDetail'
}

export interface ScRemediationError {
    kind: Scalars['String']
    details: ScRemediationErrorDetail[]
    __typename: 'ScRemediationError'
}

export interface ScRemediationErrorDetail {
    key: Scalars['String']
    value: Scalars['String']
    __typename: 'ScRemediationErrorDetail'
}

export type ScRemediationState = 'PROPOSED' | 'ACCEPTED' | 'APPLIED' | 'DISCARDED'

export interface ScSinglePolicyResult {
    /** The latest image for this policy stream */
    latestImage: ScPolicyImage
    /** The policy */
    policy: BaseScPolicy
    __typename: 'ScSinglePolicyResult'
}

export interface ScSinglePolicyResults {
    /** The paging of the policy result */
    paging: Paging
    /** The matching results */
    items: ScSinglePolicyResult[]
    __typename: 'ScSinglePolicyResults'
}

export interface ScStream {
    /** The name of the stream */
    name: Scalars['String']
    __typename: 'ScStream'
}

export type ScStreamBaseImagesSummaryOrderingField = 'BASE_IMAGES_COUNT' | 'CHILD_IMAGES_COUNT' | 'REPO_NAME'

export interface ScStreamBaseImagesSummaryResult {
    /** Paging of the base images */
    paging: Paging
    /** The matching base images */
    items: ScBaseImageSummary[]
    __typename: 'ScStreamBaseImagesSummaryResult'
}

export interface ScStreamCVE {
    cveId: Scalars['String']
    highestSeverity: CVSSSeverity
    highestCVSSScore: (Scalars['String'] | null)
    detectedInCount: Scalars['Int']
    fixable: Scalars['Boolean']
    packages: StreamCVEPackage[]
    __typename: 'ScStreamCVE'
}

export type ScStreamCVEsOrderingField = 'SEVERITY' | 'DETECTED_IN_COUNT' | 'CVSS_SCORE'

export interface ScStreamCVEsResult {
    /** Paging of the base images */
    paging: Paging
    /** The matching base images */
    items: ScStreamCVE[]
    __typename: 'ScStreamCVEsResult'
}

export interface ScStreamGroupedPackagesResult {
    /** Paging of the packages */
    paging: Paging
    /** The matching packages */
    items: ScGroupedPackage[]
    /** The list of all available package types, ignoring any filters applied */
    packageTypes: Scalars['String'][]
    __typename: 'ScStreamGroupedPackagesResult'
}

export type ScStreamImagesByBaseImageOrderingField = 'LAST_PUSHED' | 'REPO_NAME'

export interface ScStreamImagesByBaseImageResult {
    /** Paging of the base images */
    paging: Paging
    /** The matching images and their base image */
    items: ImageWithBaseImage[]
    __typename: 'ScStreamImagesByBaseImageResult'
}

export type ScStreamImagesOrderingField = 'LAST_PUSHED' | 'TAG_UPDATED_AT'

export interface ScStreamImagesResult {
    /** Paging of the images */
    paging: Paging
    /** The matching images */
    items: ImageWithBaseImage[]
    __typename: 'ScStreamImagesResult'
}

export interface ScStreamsResult {
    /** Paging of the streams */
    paging: Paging
    /** The matching streams */
    items: ScStream[]
    __typename: 'ScStreamsResult'
}

export type ScTaggedImagesOrderingField = 'LAST_PUSHED' | 'TAG_NAME'

export interface ScTaggedImagesResult {
    /** The hostname of the Docker registry */
    hostName: Scalars['String']
    /** The name of the Docker repository */
    repoName: Scalars['String']
    /** Paging of the images */
    paging: Paging
    /** The matching tags */
    tags: ScTagWithDigest[]
    /** The images associated to the different tags */
    images: ImageWithBaseImage[]
    __typename: 'ScTaggedImagesResult'
}


/** This type represents a tag with the associated current digest */
export interface ScTagWithDigest {
    /** The name of the tag. */
    name: Scalars['String']
    /** The digest of the current image associated to this tag */
    digest: Scalars['ID']
    /** The last update date of this tag represented as an ISO8601 string. */
    updatedAt: Scalars['String']
    __typename: 'ScTagWithDigest'
}

export interface ScUserResult {
    /** The id of the user */
    id: Scalars['ID']
    /** The email of the user */
    email: (Scalars['String'] | null)
    /** The name of the user */
    name: (Scalars['String'] | null)
    /** The username of the user */
    username: (Scalars['String'] | null)
    /** The avatar url of the user */
    avatarUrl: (Scalars['String'] | null)
    /** The organizations the user is part of */
    orgs: DockerOrg[]
    __typename: 'ScUserResult'
}

export interface ScVEX {
    id: (Scalars['String'] | null)
    author: (Scalars['String'] | null)
    role: (Scalars['String'] | null)
    timestamp: (Scalars['String'] | null)
    version: (Scalars['String'] | null)
    statements: ((ScVEXStatement | null)[] | null)
    __typename: 'ScVEX'
}

export interface ScVexDocument {
    id: Scalars['String']
    documentUrl: (Scalars['String'] | null)
    timestamp: Scalars['String']
    author: Scalars['String']
    version: Scalars['String']
    __typename: 'ScVexDocument'
}

export interface ScVEXsResult {
    documents: (ScVEX | null)[]
    __typename: 'ScVEXsResult'
}

export interface ScVexStatement {
    id: Scalars['ID']
    document: ScVexDocument
    timestamp: Scalars['String']
    cveId: Scalars['String']
    status: ScVexStatementStatus
    justification: (ScVexStatementJustification | null)
    impactStatement: (Scalars['String'] | null)
    imageScopes: ScVexStatementImageScope[]
    packageScopes: ScVexStatementPackageScope[]
    errors: ScVexStatementError[]
    __typename: 'ScVexStatement'
}

export interface ScVEXStatement {
    sourceId: (Scalars['String'] | null)
    status: (Scalars['String'] | null)
    statusNotes: (Scalars['String'] | null)
    justification: (Scalars['String'] | null)
    actionStatement: (Scalars['String'] | null)
    impactStatement: (Scalars['String'] | null)
    products: ((Scalars['String'] | null)[] | null)
    subcomponents: ((Scalars['String'] | null)[] | null)
    __typename: 'ScVEXStatement'
}

export interface ScVexStatementError {
    message: Scalars['String']
    __typename: 'ScVexStatementError'
}

export interface ScVexStatementImageScope {
    hostName: (Scalars['String'] | null)
    repoName: (Scalars['String'] | null)
    digest: (Scalars['String'] | null)
    __typename: 'ScVexStatementImageScope'
}

export type ScVexStatementJustification = 'COMPONENT_NOT_PRESENT' | 'VULNERABLE_CODE_NOT_PRESENT' | 'VULNERABLE_CODE_NOT_IN_EXECUTE_PATH' | 'VULNERABLE_CODE_CANNOT_BE_CONTROLLED_BY_ADVERSARY' | 'INLINE_MITIGATIONS_ALREADY_EXIST'

export interface ScVexStatementPackageScope {
    namespace: (Scalars['String'] | null)
    name: Scalars['String']
    purl: Scalars['String']
    type: Scalars['String']
    version: (Scalars['String'] | null)
    qualifiers: (Scalars['String'] | null)
    subpath: (Scalars['String'] | null)
    __typename: 'ScVexStatementPackageScope'
}

export interface ScVexStatementsQueryResult {
    items: ScVexStatement[]
    itemsWithErrorsCount: Scalars['Int']
    paging: Paging
    __typename: 'ScVexStatementsQueryResult'
}

export type ScVexStatementStatus = 'NOT_AFFECTED' | 'AFFECTED' | 'FIXED' | 'UNDER_INVESTIGATION'

export interface ScVulnerabilityException {
    id: Scalars['ID']
    author: Scalars['String']
    timestamp: Scalars['String']
    errors: ScVulnerabilityExceptionError[]
    vulnerability: ScVulnerabilityExceptionVulnerability
    type: ScVulnerabilityExceptionType
    /**
     * The image scopes of the vulnerability exception.
     * - null means "apply to all images in the org" of this exception.
     * - an empty array should be considered as an error.
     */
    imageScopes: (ScVulnerabilityExceptionImageScope[] | null)
    reason: (ScVulnerabilityExceptionReason | null)
    __typename: 'ScVulnerabilityException'
}

export interface ScVulnerabilityExceptionError {
    message: Scalars['String']
    __typename: 'ScVulnerabilityExceptionError'
}

export interface ScVulnerabilityExceptionImageScope {
    hostName: (Scalars['String'] | null)
    repoName: (Scalars['String'] | null)
    digest: (Scalars['String'] | null)
    /** The package scopes of the vulnerability exception. null means "all packages in the image" */
    packageScopes: (ScVulnerabilityExceptionPackageScope[] | null)
    __typename: 'ScVulnerabilityExceptionImageScope'
}

export interface ScVulnerabilityExceptionPackageScope {
    purl: Scalars['String']
    purlFields: ScPurl
    __typename: 'ScVulnerabilityExceptionPackageScope'
}

export interface ScVulnerabilityExceptionReason {
    justification: (ScVexStatementJustification | null)
    additionalDetails: (Scalars['String'] | null)
    source: BaseScVulnerabilityExceptionSource
    __typename: 'ScVulnerabilityExceptionReason'
}

export interface ScVulnerabilityExceptionScoutSource {
    id: Scalars['ID']
    __typename: 'ScVulnerabilityExceptionScoutSource'
}

export type ScVulnerabilityExceptionType = 'ACCEPTED_RISK' | 'FALSE_POSITIVE'

export interface ScVulnerabilityExceptionVEXSource {
    id: Scalars['ID']
    document: ScVexDocument
    __typename: 'ScVulnerabilityExceptionVEXSource'
}

export interface ScVulnerabilityExceptionVulnerability {
    cveId: Scalars['String']
    highestSeverity: (CVSSSeverity | null)
    highestCVSSScore: (Scalars['String'] | null)
    __typename: 'ScVulnerabilityExceptionVulnerability'
}

export interface ScVulnerabilityPolicy {
    /** Name of the policy definition */
    definitionName: Scalars['String']
    /** Name of the policy configuration */
    configurationName: Scalars['String']
    /** Display name of the configured policy */
    displayName: (Scalars['String'] | null)
    /** Human-readable description of the configured policy */
    description: (Scalars['String'] | null)
    /** Whether policy has been evaluated */
    evaluated: Scalars['Boolean']
    /** The latest result of evaluating the policy */
    currentResult: (ScVulnerabilityPolicyResult | null)
    /** The latest delta for the policy, regardless of reason (the change in policy results since the specified timestamp) */
    latestDelta: (ScPolicyDelta | null)
    /** The available remediations for this policy result */
    remediations: ScRemediation[]
    __typename: 'ScVulnerabilityPolicy'
}

export interface ScVulnerabilityPolicyResult {
    statusLabel: Scalars['String']
    deviations: ScPolicyResultVulnerabilityDeviation[]
    deviationCount: Scalars['Int']
    createdDateTime: Scalars['String']
    /** If changes have been made to the policy that haven't been evaluated */
    isStale: (Scalars['Boolean'] | null)
    __typename: 'ScVulnerabilityPolicyResult'
}


/** A summary of vulnerability information about an image. */
export interface SdImageSummary {
    /** The image digest that we are returning the summary for */
    digest: Scalars['String']
    /** The indexing state of the SBOM for the image whose report we are returning */
    sbomState: SBOMState
    /**
     * A report on this image's vulnerabilities. Report will be null if the image
     * exists but no scan has occurred.
     */
    vulnerabilityReport: (VulnerabilityReport | null)
    __typename: 'SdImageSummary'
}


/** The metadata of the matched secret. */
export interface SecretFinding {
    /** The identifier for the rule which found the secret. */
    ruleId: Scalars['String']
    /** The category of the secret, e.g. GitHub. */
    category: Scalars['String']
    /** The title of the discovery. */
    title: Scalars['String']
    /** The severity of the discovered secet */
    severity: MatchedSecretSeverity
    /** The line or code where the secret was found, with the secret redacted. */
    match: Scalars['String']
    /** The startLine of the matched secret. */
    startLine: (Scalars['Int'] | null)
    /** The endLine of the matched secret. */
    endLine: (Scalars['Int'] | null)
    __typename: 'SecretFinding'
}

export interface SetStreamImagesResult {
    status: SetStreamImagesStatus
    __typename: 'SetStreamImagesResult'
}

export type SetStreamImagesStatus = 'ACCEPTED'

export type SortOrder = 'ASCENDING' | 'DESCENDING'

export interface StreamCVEPackage {
    purl: Scalars['String']
    severity: CVSSSeverity
    cvssScore: (Scalars['String'] | null)
    fixedBy: Scalars['String'][]
    __typename: 'StreamCVEPackage'
}


/** Stream vulnerability reports response */
export interface StrVulnerabilityReports {
    /** The vulnerability reports over time */
    items: TimestampedVulnerabilityReport[]
    __typename: 'StrVulnerabilityReports'
}

export type StrVulnerabilityReportsQueryTimescale = 'DAYS_7' | 'DAYS_14' | 'DAYS_30' | 'DAYS_90' | 'DAYS_180' | 'DAYS_365'

export type StrVulnerabilityReportsSummaryType = 'CUMULATIVE' | 'UNIQUE'


/** A vulnerability report from a specific timestamp */
export interface TimestampedVulnerabilityReport {
    /** The timestamp at which the vulnerability report was taken (in ISO8601 format) */
    timestamp: Scalars['String']
    /** A report of the vulnerability counts at the given time */
    vulnerabilityReport: VulnerabilityReport
    __typename: 'TimestampedVulnerabilityReport'
}


/** The repository we are returning recommendations for */
export interface TrDockerRepository {
    /** The docker repository name */
    name: Scalars['String']
    /** The number of times this repository has been docker pulled */
    pullCount: (Scalars['Float'] | null)
    /** The number of times this repository has been starred */
    starCount: (Scalars['Int'] | null)
    /** The docker repository description */
    description: (Scalars['String'] | null)
    __typename: 'TrDockerRepository'
}


/** The Docker Tag information */
export interface TrDockerTag {
    /** The image digest */
    digest: Scalars['String']
    /** The index digest */
    indexDigest: (Scalars['String'] | null)
    /** When this tag was created */
    createdAt: Scalars['String']
    /** The number of packages in this tag */
    packageCount: Scalars['Int']
    /** The image size */
    imageSize: Scalars['Float']
    /**
     * @deprecated No longer supported
     * The image size
     */
    size: Scalars['Int']
    /** The tags */
    tags: Scalars['String'][]
    /** The aliases */
    aliases: Scalars['String'][]
    /** The vulnerabilities associated with this tag */
    vulnerabilityReport: (VulnerabilityReport | null)
    /**
     * @deprecated No longer supported
     * The vulnerabilities associated with this tag
     */
    vulnerabilities: VulnerabilityReport
    /** The parsed tag data */
    tag: TrTagData
    /** The scores for our recommendations */
    scoring: (TrScoring | null)
    __typename: 'TrDockerTag'
}


/** A tag recommendation */
export interface TrRecommendations {
    /** The current tag */
    currentTag: TrDockerTag
    /** The recommended tags */
    recommendedTags: TrDockerTag[]
    __typename: 'TrRecommendations'
}


/** Recommended tag response */
export interface TrRecommendedTags {
    /** The docker repository we are returning for */
    repository: TrDockerRepository
    /** The tag recommendations for this repository */
    recommendations: TrRecommendations[]
    __typename: 'TrRecommendedTags'
}


/** Tag scoring data */
export interface TrScoring {
    /** Total score of the recommended tag */
    total: Scalars['Int']
    /** Summary of the tag recommendation */
    summary: Scalars['String']
    /** Details of the scoring calculation */
    details: TrScoringDetails[]
    __typename: 'TrScoring'
}


/** Scoring criteria for recommendations */
export interface TrScoringDetails {
    /** The name of the scoring criteria */
    name: Scalars['String']
    /** The Reason for the score */
    reason: Scalars['String']
    /** The score */
    score: Scalars['Int']
    __typename: 'TrScoringDetails'
}


/** Tag metadata */
export interface TrTagData {
    /** Name of the tag */
    name: Scalars['String']
    /** os of the tag */
    os: (Scalars['String'] | null)
    /** framework of the tag */
    framework: (Scalars['String'] | null)
    /** runtime of the tag */
    runtime: (Scalars['String'] | null)
    /** flavour of the tag */
    flavor: (Scalars['String'] | null)
    /** is it slim? */
    slim: (Scalars['Boolean'] | null)
    __typename: 'TrTagData'
}


/** An individual tag recommendation for a digest */
export interface TrTagRecommendationResult {
    /** The digest the result corresponds to */
    digest: Scalars['String']
    /** The recommended tags for this digest or null if nothing could be found */
    recommendedTags: (TrRecommendedTags | null)
    __typename: 'TrTagRecommendationResult'
}


/** The result of a tagRecommendationsByDigest query */
export interface TrTagRecommendationsByDigestsResult {
    /** The tag recommendations for each digest requested */
    items: (TrTagRecommendationResult[] | null)
    __typename: 'TrTagRecommendationsByDigestsResult'
}

export interface UpdateVulnerabilityExceptionResult {
    exception: ScVulnerabilityException
    __typename: 'UpdateVulnerabilityExceptionResult'
}

export type VEXStatementJustification = 'COMPONENT_NOT_PRESENT' | 'VULNERABLE_CODE_NOT_PRESENT' | 'VULNERABLE_CODE_NOT_IN_EXECUTE_PATH' | 'VULNERABLE_CODE_CANNOT_BE_CONTROLLED_BY_ADVERSARY' | 'INLINE_MITIGATIONS_ALREADY_EXIST'

export type VEXStatementStatus = 'NOT_AFFECTED' | 'AFFECTED' | 'FIXED' | 'UNDER_INVESTIGATION'

export interface VpCVSS {
    /** the CVSS severity of the vulnerability */
    severity: (CVSSSeverity | null)
    /** the CVSSVersion used to source the vulnerability data */
    version: (CVSSVersion | null)
    /** the CVSS score of the vulnerability */
    score: (Scalars['Float'] | null)
    /** the CVSS vector of the vulnerability */
    vector: (Scalars['String'] | null)
    __typename: 'VpCVSS'
}

export interface VpCWE {
    /** The id of the CWE */
    cweId: Scalars['String']
    /** A description of the CWE */
    description: (Scalars['String'] | null)
    /** The CWE http url */
    url: Scalars['String']
    __typename: 'VpCWE'
}


/** Contains the packageUrl that matched vulnerabilities and an array of vulnerabilites that matched */
export interface VpPackageVulnerability {
    purl: Scalars['String']
    vulnerabilities: VpVulnerability[]
    __typename: 'VpPackageVulnerability'
}


/** Describes the vulnerability that the package is vulnerable to */
export interface VpVulnerability {
    /** the source id or cve id of the vulnerability */
    sourceId: Scalars['String']
    /** the source of the vulnerability data e.g. NIST, docker etc */
    source: Scalars['String']
    /** a textual description of the vulnerability, can contain markdown depending on the source */
    description: (Scalars['String'] | null)
    /** a list of CWEs that the vulnerability contains */
    cwes: VpCWE[]
    /** the CVSS score object for this vulnerability */
    cvss: VpCVSS
    /** the version that this vulnerability is fixed by if available */
    fixedBy: (Scalars['String'] | null)
    /** the version range that this vulnerability applies to */
    vulnerableRange: Scalars['String']
    /** an HTML link to more information on the vulnerability */
    url: Scalars['String']
    /** The date/time when this vulnerability was first published */
    publishedAt: (Scalars['String'] | null)
    /** The date/time when this vulnerability was last updated */
    updatedAt: (Scalars['String'] | null)
    /** EPSS data for the vulnerability if present */
    epss: (EPSS | null)
    /** Is this vulnerability in the CISA list of known exploited vulnerabilities? */
    cisaExploited: Scalars['Boolean']
    /** Is this vulnerability excepted (suppressed) in the context of the queried image? */
    isExcepted: Scalars['Boolean']
    /** The details of the excepted vulnerability, only populated if isExcepted is true */
    vulnerabilityExceptions: PkVulnerabilityException[]
    /**
     * The VEX statements that apply to the package, this differs to vulnerabilityExceptions in that it includes
     * VEX statements that are not exceptions, e.g. under_investigation, affected etc. 
     */
    vexStatements: PkVexStatement[]
    __typename: 'VpVulnerability'
}


/** This type represents a vulnerability report about an image. */
export interface VulnerabilityReport {
    /** The number of critical severity vulnerabilities present in the image. */
    critical: Scalars['Int']
    /** The number of high severity vulnerabilities present in the image. */
    high: Scalars['Int']
    /** The number of medium severity vulnerabilities present in the image. */
    medium: Scalars['Int']
    /** The number of low severity vulnerabilities present in the image. */
    low: Scalars['Int']
    /** The number of vulnerabilities with an unspecified severity present in the image. */
    unspecified: Scalars['Int']
    /** The total number of vulnerabilities present in the image. */
    total: Scalars['Int']
    __typename: 'VulnerabilityReport'
}

export interface ArtifactoryAgentEntitlement {
    enabled: Scalars['Boolean']
    /** If the feature is not enabled, what plan is required? */
    planRequirement: (PlanRequirement | null)
    __typename: 'ArtifactoryAgentEntitlement'
}

export type BillingCycle = 'annual' | 'monthly'

export type BillingOrigin = 'inside_sales' | 'self_serve' | 'unknown'

export interface BlockedRepoResult {
    hostName: Scalars['String']
    namespace: Scalars['String']
    repoName: Scalars['String']
    blocked: Scalars['Boolean']
    __typename: 'BlockedRepoResult'
}

export interface ConfigurablePolicyEntitlement {
    enabled: Scalars['Boolean']
    /** If the feature is not enabled, what product tier is required? */
    planRequirement: (PlanRequirement | null)
    __typename: 'ConfigurablePolicyEntitlement'
}

export interface DhiEntitlement {
    /** Is dhi fully enabled for this namespace, either via a plan or a free trial */
    dhiEnabled: Scalars['Boolean']
    /** Can this namespace mirror more repos? */
    canMirrorMoreRepositories: Scalars['Boolean']
    /** Can this namespace view the dhi catalog? */
    canViewCatalog: Scalars['Boolean']
    /** The number of repos this namespace can mirror */
    repositoriesLimit: Scalars['Int']
    /** The number of repos this namespace has mirrored */
    mirroredRepositoriesCount: Scalars['Int']
    /** Is this namespace in a free trial? */
    freeTrial: Scalars['Boolean']
    /** The end date of the free trial if applicable */
    freeTrialEndDate: (Scalars['String'] | null)
    __typename: 'DhiEntitlement'
}

export interface DhiRepoFeature {
    isDhiRepo: Scalars['Boolean']
    /** The dhi mirrored repository, null if not a DHI repo. */
    dhiMirroredRepository: (EntitlementsDhiMirroredRepository | null)
    __typename: 'DhiRepoFeature'
}

export interface EnabledRepositoriesResult {
    repos: RepositoryResult[]
    count: Scalars['Int']
    entitlementUsed: Scalars['Int']
    __typename: 'EnabledRepositoriesResult'
}

export interface EntitlementsDhiMirroredRepository {
    id: Scalars['String']
    dhiSourceRepository: EntitlementsDhiSourceRepository
    __typename: 'EntitlementsDhiMirroredRepository'
}

export interface EntitlementsDhiSourceRepository {
    name: Scalars['String']
    namespace: Scalars['String']
    displayName: Scalars['String']
    __typename: 'EntitlementsDhiSourceRepository'
}

export type FeatureEntitlement = (ArtifactoryAgentEntitlement | ConfigurablePolicyEntitlement | LocalRepositoryEntitlement | RemoteRepositoryEntitlement | VulnerabilityReportingEntitlement) & { __isUnion?: true }

export interface FeatureEntitlements {
    artifactoryAgent: ArtifactoryAgentEntitlement
    configurablePolicy: ConfigurablePolicyEntitlement
    localRepository: LocalRepositoryEntitlement
    remoteRepository: RemoteRepositoryEntitlement
    scoutAPI: ScoutAPIEntitlement
    vulnerabilityReporting: VulnerabilityReportingEntitlement
    scoutEverywhere: ScoutEverywhereEntitlement
    dhi: DhiEntitlement
    enableOnPush: Scalars['Boolean']
    __typename: 'FeatureEntitlements'
}

export interface Integration {
    skill: Skill
    configurationName: Scalars['String']
    __typename: 'Integration'
}

export interface ListBlockedReposResult {
    repos: RepositoryResult[]
    count: Scalars['Int']
    __typename: 'ListBlockedReposResult'
}

export interface LocalRepositoryEntitlement {
    enabled: Scalars['Boolean']
    /** If enabled and limit = nil, then unliminted */
    accountLimit: (Scalars['Int'] | null)
    /** True if unlimited */
    isUnlimited: Scalars['Boolean']
    /**
     * @deprecated No longer supported
     * Currently not defined. Always nil
     */
    planLimit: (Scalars['Int'] | null)
    /** If the feature is not enabled, what product tier is required? */
    planRequirement: (PlanRequirement | null)
    __typename: 'LocalRepositoryEntitlement'
}

export interface Maintenance {
    severity: MaintenanceSeverity
    title: Scalars['String']
    message: Scalars['String']
    __typename: 'Maintenance'
}

export type MaintenanceSeverity = 'info' | 'warning' | 'error'

export interface NamespaceEntitlements {
    namespace: Scalars['String']
    plan: ScEntitlementsPlan
    isEnrolled: Scalars['Boolean']
    /** Null == Scout not enrolled */
    scoutEnrollment: (ScoutEnrollment | null)
    featureEntitlements: (FeatureEntitlements | null)
    __typename: 'NamespaceEntitlements'
}

export interface PlanRequirement {
    plan: ProductPlan
    tier: ProductTier
    __typename: 'PlanRequirement'
}

export type ProductPlan = 'SCOUT_0' | 'SCOUT_1' | 'SCOUT_2'

export interface ProductSubscription {
    /** @deprecated No longer supported */
    tier: ProductTier
    billingCycle: (BillingCycle | null)
    quantity: (ProductSubscriptionQuantity | null)
    renewalEnabled: (Scalars['Boolean'] | null)
    renewalDate: (Scalars['String'] | null)
    endDate: (Scalars['String'] | null)
    status: (ProductSubscriptionStatus | null)
    graceDays: (Scalars['Int'] | null)
    renewalAmount: (Scalars['Int'] | null)
    totalAmount: (Scalars['Int'] | null)
    origin: (BillingOrigin | null)
    pendingChanges: (ProductSubscriptionPendingChange[] | null)
    __typename: 'ProductSubscription'
}

export interface ProductSubscriptionPendingChange {
    type: (ProductSubscriptionPendingChangeType | null)
    date: (Scalars['String'] | null)
    tier: (ProductTier | null)
    billingCycle: (Scalars['String'] | null)
    quantity: (ProductSubscriptionQuantity | null)
    __typename: 'ProductSubscriptionPendingChange'
}

export type ProductSubscriptionPendingChangeType = 'quantity_decrease' | 'quantity_increase' | 'tier_change' | 'cycle_change'

export interface ProductSubscriptionQuantity {
    value: (Scalars['Int'] | null)
    unit: (Scalars['String'] | null)
    __typename: 'ProductSubscriptionQuantity'
}

export type ProductSubscriptionStatus = 'active' | 'inactive' | 'past_due'

export type ProductTier = 'free' | 'freeteam' | 'team' | 'business' | 'dsos' | 'pro' | 'captain'

export interface RemoteRepositoryEntitlement {
    enabled: Scalars['Boolean']
    /** If enabled and limit = nil, then unliminted */
    accountLimit: (Scalars['Int'] | null)
    /** True if unlimited */
    isUnlimited: Scalars['Boolean']
    /**
     * @deprecated No longer supported
     * Currently not defined, always nil
     */
    planLimit: (Scalars['Int'] | null)
    /** If the feature is not enabled, what product tier is required? */
    planRequirement: (PlanRequirement | null)
    /** Count of the number of repos currently enabled */
    enabledRepoCount: Scalars['Int']
    /** Count of the number of enabled repos which count towards their repository entitlement */
    entitlementUsed: Scalars['Int']
    /** Is this namespace exceeding their remote repository entitlement? */
    repoEntitlementExceeded: Scalars['Boolean']
    __typename: 'RemoteRepositoryEntitlement'
}

export interface RepositoryFeatureResult {
    namespace: Scalars['String']
    repoName: Scalars['String']
    hostName: Scalars['String']
    features: (RepositoryFeatures | null)
    __typename: 'RepositoryFeatureResult'
}

export interface RepositoryFeatures {
    vulnerabilityReporting: (VulnerabilityReportingRepoFeature | null)
    dhi: DhiRepoFeature
    __typename: 'RepositoryFeatures'
}

export interface RepositoryProperties {
    preventDisable: Scalars['Boolean']
    __typename: 'RepositoryProperties'
}

export interface RepositoryResult {
    hostName: Scalars['String']
    repoName: Scalars['String']
    integration: (Integration | null)
    type: RepositoryType
    properties: RepositoryProperties
    __typename: 'RepositoryResult'
}

export type RepositoryType = 'standard' | 'dhi_mirror'

export interface ScEntitlementsPlan {
    displayName: Scalars['String']
    isLegacy: Scalars['Boolean']
    isFree: Scalars['Boolean']
    __typename: 'ScEntitlementsPlan'
}

export interface ScoutAPIEntitlement {
    /** Is scoutAPI enabled for this namespace */
    enabled: Scalars['Boolean']
    /** Is api access blocked due to the namespace exceeding repo limits? */
    accessRestrictedDueToRepoLimits: Scalars['Boolean']
    __typename: 'ScoutAPIEntitlement'
}

export interface ScoutEnrollment {
    /** @deprecated No longer supported */
    plan: (ProductPlan | null)
    /** Refer to https://api.docker.team/api/billing_api#tag/products/paths/~1api~1billing~1v5~1accounts~1%7Baccount_name%7D~1products~1%7Bproduct_name%7D/get */
    activeSubscription: (ProductSubscription | null)
    /**
     * @deprecated No longer supported
     * Deprecated: use NamespaceEntitlements/featureEntitlements instead.
     */
    features: ScoutEnrollmentFeatures
    __typename: 'ScoutEnrollment'
}

export interface ScoutEnrollmentFeatures {
    repository: ScoutEnrollmentFeaturesRepo
    __typename: 'ScoutEnrollmentFeatures'
}

export interface ScoutEnrollmentFeaturesRepo {
    local: Scalars['Int']
    remote: Scalars['Int']
    __typename: 'ScoutEnrollmentFeaturesRepo'
}

export interface ScoutEverywhereEntitlement {
    /** Is scout everywhere scanning enabled on this namespace? */
    scanningEnabled: Scalars['Boolean']
    __typename: 'ScoutEverywhereEntitlement'
}

export interface ServiceStatusResult {
    maintenance: (Maintenance | null)
    __typename: 'ServiceStatusResult'
}

export interface SetEnableReposOnPushResult {
    /** Whether the organization is set to enable repos which aren't blocked on push, can only be used by organizations in the 'business' tier. */
    enabled: Scalars['Boolean']
    __typename: 'SetEnableReposOnPushResult'
}

export interface ShouldEnableReposOnPushResult {
    enabled: Scalars['Boolean']
    __typename: 'ShouldEnableReposOnPushResult'
}

export interface Skill {
    namespace: Scalars['String']
    name: Scalars['String']
    __typename: 'Skill'
}

export interface VulnerabilityReportingEntitlement {
    enabled: Scalars['Boolean']
    /** If enabled and limit = nil, then unliminted */
    accountLimit: (Scalars['Int'] | null)
    /** If enabled and limit = nil, then unliminted */
    planLimit: (Scalars['Int'] | null)
    /** If the feature is not enabled, what plan is required? */
    planRequirement: (PlanRequirement | null)
    /**
     * Deprecated: use accountLimit instead
     * If enabled and limit = negative, then unliminted
     */
    limit: (Scalars['Int'] | null)
    __typename: 'VulnerabilityReportingEntitlement'
}

export interface VulnerabilityReportingRepoFeature {
    enabled: Scalars['Boolean']
    __typename: 'VulnerabilityReportingRepoFeature'
}

export interface VulnerabilityReportingResult {
    namespace: Scalars['String']
    repoName: Scalars['String']
    hostName: Scalars['String']
    vulnerabilityReporting: (VulnerabilityReportingRepoFeature | null)
    __typename: 'VulnerabilityReportingResult'
}

export interface MgAttestation {
    digest: Scalars['String']
    predicateType: Scalars['String']
    reference: Scalars['String']
    __typename: 'MgAttestation'
}

export interface MgAttestationBuildArg {
    key: Scalars['String']
    value: Scalars['String']
    __typename: 'MgAttestationBuildArg'
}

export interface MgAttestationBuildParameters {
    args: MgAttestationBuildArg[]
    __typename: 'MgAttestationBuildParameters'
}

export interface MgAttestationDockerfile {
    rawContent: Scalars['String']
    sourceMap: MgAttestationDockerfileSourceMap[]
    __typename: 'MgAttestationDockerfile'
}

export interface MgAttestationDockerfileSourceMap {
    digests: Scalars['String'][]
    endColumn: Scalars['Int']
    endLine: Scalars['Int']
    instruction: Scalars['String']
    source: Scalars['String']
    startColumn: Scalars['Int']
    startLine: Scalars['Int']
    __typename: 'MgAttestationDockerfileSourceMap'
}


/**
 * This type represents the OCI Image Configuration for an image.
 * Documentation can be found here: https://github.com/opencontainers/image-spec/blob/main/config.md
 */
export interface MgAttestationOCIConfig {
    config: MgAttestationOCIConfigConfig
    __typename: 'MgAttestationOCIConfig'
}

export interface MgAttestationOCIConfigConfig {
    user: (Scalars['String'] | null)
    /**
     * The exposed ports for the image. This is represented here as a list of strings, but it is actually
     * a map in the format of `{ "80/tcp": {} }` in the oci image spec, where the value is always an empty 
     */
    exposedPorts: Scalars['String'][]
    env: Scalars['String'][]
    entrypoint: Scalars['String'][]
    cmd: Scalars['String'][]
    /**
     * The volumes for the image. This is represented here as a list of strings, but it is actually
     * a map in the format of `{ "/var/lib/something": {} }` in the oci image spec, where the value is always an empty 
     */
    volumes: Scalars['String'][]
    workingDir: (Scalars['String'] | null)
    labels: MgAttestationOCIConfigConfigLabel[]
    stopSignal: (Scalars['String'] | null)
    argsEscaped: (Scalars['Boolean'] | null)
    memory: (Scalars['Int'] | null)
    memorySwap: (Scalars['Int'] | null)
    cpuShares: (Scalars['Int'] | null)
    healthcheck: (MgAttestationOCIConfigConfigHealthcheck | null)
    __typename: 'MgAttestationOCIConfigConfig'
}

export interface MgAttestationOCIConfigConfigHealthcheck {
    test: Scalars['String'][]
    interval: (Scalars['Int'] | null)
    timeout: (Scalars['Int'] | null)
    retries: (Scalars['Int'] | null)
    __typename: 'MgAttestationOCIConfigConfigHealthcheck'
}

export interface MgAttestationOCIConfigConfigLabel {
    key: Scalars['String']
    value: Scalars['String']
    __typename: 'MgAttestationOCIConfigConfigLabel'
}

export interface MgAttestationsListResult {
    /** Paging of the attestations */
    paging: Paging
    /** The image's attestations */
    items: MgAttestation[]
    __typename: 'MgAttestationsListResult'
}

export interface MgAttestationSource {
    commitUrl: (Scalars['String'] | null)
    commitSha: Scalars['String']
    dockerfileUrl: (Scalars['String'] | null)
    __typename: 'MgAttestationSource'
}

export interface MgAttestationsResult {
    buildParameters: (MgAttestationBuildParameters | null)
    dockerfile: (MgAttestationDockerfile | null)
    ociConfig: (MgAttestationOCIConfig | null)
    source: (MgAttestationSource | null)
    __typename: 'MgAttestationsResult'
}

export type BasePurlFields = (PurlFields | VEXPackageScope) & { __isUnion?: true }

export interface DeleteWebhookResult {
    success: Scalars['Boolean']
    __typename: 'DeleteWebhookResult'
}

export interface DhiDestinationRepository {
    name: Scalars['String']
    namespace: Scalars['String']
    hostname: Scalars['String']
    __typename: 'DhiDestinationRepository'
}

export interface DhiGetMirroredRepositoriesBySourceRepositoryResponse {
    /** The list of mirrored repositories */
    mirroredRepositories: DhiMirroredRepository[]
    __typename: 'DhiGetMirroredRepositoriesBySourceRepositoryResponse'
}

export interface DhiGetMirroredRepositoryResponse {
    /** The mirrored repository, null if it doesn't exist */
    mirroredRepository: (DhiMirroredRepository | null)
    __typename: 'DhiGetMirroredRepositoryResponse'
}


/** Details for a DHI image manifest */
export interface DhiImageManifest {
    manifestDigest: Scalars['String']
    platform: Scalars['String']
    distribution: Scalars['String']
    compressedSize: Scalars['Float']
    packageManager: (Scalars['String'] | null)
    shell: (Scalars['String'] | null)
    user: Scalars['String']
    workingDirectory: Scalars['String']
    fipsCompliant: Scalars['Boolean']
    stigCertified: Scalars['Boolean']
    lastPushed: Scalars['String']
    vulnerabilities: (VulnerabilityReport | null)
    scoutHealthScore: (ScoutHealthScore | null)
    __typename: 'DhiImageManifest'
}

export interface DhiImageTag {
    name: Scalars['String']
    lastUpdated: Scalars['String']
    __typename: 'DhiImageTag'
}


/**
 * An index digest for a DHI image. Contains an aggregate of all the tags
 * that apply to this image. Also contains all the manifests that make up this
 * index.
 */
export interface DhiIndexImage {
    indexDigest: Scalars['String']
    tags: DhiImageTag[]
    imageManifests: DhiImageManifest[]
    __typename: 'DhiIndexImage'
}

export interface DhiListMirroredRepositoriesResponse {
    /** The list of mirrored repositories */
    mirroredRepositories: DhiMirroredRepository[]
    /** The total number of mirrored repositories */
    totalCount: Scalars['Int']
    /** Whether the organization can mirror more repositories */
    canMirrorMoreRepositories: Scalars['Boolean']
    __typename: 'DhiListMirroredRepositoriesResponse'
}

export interface DhiListMirroringLogsResult {
    items: DhiMirroringLog[]
    __typename: 'DhiListMirroringLogsResult'
}

export interface DhiMirroredRepository {
    id: Scalars['String']
    destinationRepository: DhiDestinationRepository
    dhiSourceRepository: DhiSourceRepository
    __typename: 'DhiMirroredRepository'
}

export interface DhiMirroringLog {
    id: Scalars['String']
    reason: DhiMirroringLogReason
    status: DhiMirroringLogStatus
    sourceRepository: DhiSourceRepository
    destinationRepository: DhiDestinationRepository
    tag: Scalars['String']
    digest: Scalars['String']
    triggeredAt: Scalars['String']
    pushedAt: (Scalars['String'] | null)
    startedAt: (Scalars['String'] | null)
    completedAt: (Scalars['String'] | null)
    __typename: 'DhiMirroringLog'
}

export type DhiMirroringLogReason = 'ONBOARDING' | 'PUSH'

export type DhiMirroringLogStatus = 'REQUESTED' | 'STARTED' | 'FAILED' | 'SUCCEEDED'


/** The result of a query for a DHI repositories */
export interface DhiRepositoriesResult {
    items: DhiRepositorySummary[]
    /** All the categories for the repositories, ignoring filters */
    categories: DhiRepositoryCategory[]
    __typename: 'DhiRepositoriesResult'
}


/** A category for a DHI repository */
export interface DhiRepositoryCategory {
    id: Scalars['String']
    name: Scalars['String']
    __typename: 'DhiRepositoryCategory'
}


/**
 * Details for a DHI repository, used on the repo page. Contains all the information for the
 * various tabs on that page. e.g. the digest/tag lists
 */
export interface DhiRepositoryDetailsResult {
    name: Scalars['String']
    namespace: Scalars['String']
    displayName: Scalars['String']
    shortDescription: Scalars['String']
    featured: Scalars['Boolean']
    fipsCompliant: Scalars['Boolean']
    stigCertified: Scalars['Boolean']
    homeUrl: (Scalars['String'] | null)
    categories: DhiRepositoryCategory[]
    distributions: Scalars['String'][]
    platforms: Scalars['String'][]
    overview: Scalars['String']
    guides: Scalars['String']
    images: DhiIndexImage[]
    __typename: 'DhiRepositoryDetailsResult'
}


/** A summary of a DHI repository */
export interface DhiRepositorySummary {
    name: Scalars['String']
    namespace: Scalars['String']
    displayName: Scalars['String']
    shortDescription: Scalars['String']
    featured: Scalars['Boolean']
    fipsCompliant: Scalars['Boolean']
    stigCertified: Scalars['Boolean']
    homeUrl: (Scalars['String'] | null)
    categories: DhiRepositoryCategory[]
    distributions: Scalars['String'][]
    platforms: Scalars['String'][]
    __typename: 'DhiRepositorySummary'
}

export interface DhiSetMirroredRepositoryResponse {
    /** The mirrored repository, null if it doesn't exist */
    mirroredRepository: (DhiMirroredRepository | null)
    __typename: 'DhiSetMirroredRepositoryResponse'
}

export interface DhiSourceRepository {
    name: Scalars['String']
    namespace: Scalars['String']
    hostname: Scalars['String']
    displayName: Scalars['String']
    __typename: 'DhiSourceRepository'
}


/** The result of a query for a DHI tag details */
export interface DhiTagDetailsResult {
    indexDigest: Scalars['String']
    repo: Scalars['String']
    tag: DhiImageTag
    allTags: DhiImageTag[]
    imageManifests: DhiImageManifest[]
    __typename: 'DhiTagDetailsResult'
}

export type ExceptionSource = (VEXStatement | ManualException) & { __isUnion?: true }

export interface ExceptionVulnerability {
    cveId: Scalars['String']
    highestSeverity: (CVSSSeverity | null)
    highestCVSSScore: (Scalars['String'] | null)
    __typename: 'ExceptionVulnerability'
}

export interface ImageRepositoryResult {
    hostname: Scalars['String']
    repository: Scalars['String']
    __typename: 'ImageRepositoryResult'
}

export type ImagesWithPackageOrderingField = 'LAST_PUSHED' | 'NAME'

export interface ListWebhooksResult {
    items: Webhook[]
    __typename: 'ListWebhooksResult'
}

export interface ManualException {
    exceptionId: Scalars['ID']
    type: ExceptionType
    author: (Scalars['String'] | null)
    created: Scalars['String']
    cveId: Scalars['String']
    scopes: (VEXStatementScope[] | null)
    /** Present only when type is FALSE_POSITIVE */
    justification: (VEXStatementJustification | null)
    additionalDetails: (Scalars['String'] | null)
    __typename: 'ManualException'
}

export interface MutationResponse {
    status: MutationResponseStatus
    message: (Scalars['String'] | null)
    __typename: 'MutationResponse'
}

export type MutationResponseStatus = 'ACCEPTED' | 'BAD_REQUEST' | 'ERROR' | 'NOT_FOUND'

export interface PkImagePlatform {
    /** The OS (Operating System) of the image, eg. linux */
    os: Scalars['String']
    /** The chip architecture of the image, eg. arm64 */
    architecture: Scalars['String']
    /** The OS variant of the image */
    variant: (Scalars['String'] | null)
    __typename: 'PkImagePlatform'
}

export interface PkImagesWithPackageResponse {
    items: PkImageWithPackage[]
    paging: Paging
    versions: Scalars['String'][]
    __typename: 'PkImagesWithPackageResponse'
}

export interface PkImageWithPackage {
    repository: PkRepository
    digest: Scalars['String']
    name: (Scalars['String'] | null)
    lastPushed: (Scalars['String'] | null)
    packageVersions: Scalars['String'][]
    platform: (PkImagePlatform | null)
    __typename: 'PkImageWithPackage'
}

export interface PkRepository {
    hostName: Scalars['String']
    repoName: Scalars['String']
    __typename: 'PkRepository'
}

export interface PurlFields {
    namespace: (Scalars['String'] | null)
    name: Scalars['String']
    type: Scalars['String']
    version: (Scalars['String'] | null)
    qualifiers: (Scalars['String'] | null)
    subpath: (Scalars['String'] | null)
    __typename: 'PurlFields'
}

export interface ScCVEPackageVulnerability {
    /** The name of the package */
    name: (Scalars['String'] | null)
    /** The type of the package */
    type: Scalars['String']
    /** The namespace of the package */
    namespace: (Scalars['String'] | null)
    /** The name of the operating system if applicable */
    osName: (Scalars['String'] | null)
    /** The version of the operating system if applicable */
    osVersion: (Scalars['String'] | null)
    /** The version ranges of this vulnerability */
    versions: ScCVEPackageVulnerabilityVersion[]
    __typename: 'ScCVEPackageVulnerability'
}

export interface ScCVEPackageVulnerabilityVersion {
    /** The vulnerable version range of this package */
    vulnerableRange: (Scalars['String'] | null)
    /** The version of this package that fixes the vulnerability (if applicable) */
    fixedBy: (Scalars['String'] | null)
    __typename: 'ScCVEPackageVulnerabilityVersion'
}

export interface ScCVESource {
    /** The name/id of the source */
    source: Scalars['String']
    /** The formatted name of the source */
    sourceName: Scalars['String']
    /** The id of the cve at the source */
    sourceId: Scalars['String']
    /** The url of the cve at the sources database */
    url: (Scalars['String'] | null)
    /** Description of the cve from this source */
    description: (Scalars['String'] | null)
    /** When this cve was created for this source */
    createdAt: Scalars['String']
    /** When this cve was last updated for this source */
    updatedAt: Scalars['String']
    /** When this source withdrew the cve (if applicable) */
    withdrawnAt: (Scalars['String'] | null)
    /** The state of this cve (e.g. disputed). */
    state: (Scalars['String'] | null)
    /** How exploitable is this cve */
    exploitabilityScore: (Scalars['String'] | null)
    /** The severity, score and cvss for this cve */
    cvss: VpCVSS
    /** The packages from this source that are vulnerable to the cve */
    packages: ScCVEPackageVulnerability[]
    /** The CWEs that apply to this source of the cve */
    cwes: VpCWE[]
    /** A list of exploit urls */
    exploits: Scalars['String'][]
    /** A list of advisory urls */
    advisories: Scalars['String'][]
    /** A list of patch urls */
    patches: Scalars['String'][]
    /** A list of commit urls */
    commits: Scalars['String'][]
    /** A list of info urls */
    info: Scalars['String'][]
    __typename: 'ScCVESource'
}

export interface ScCVESourcesResult {
    /** The id of the cve we are returning sources for */
    cveId: Scalars['String']
    /** The default source for this cve */
    defaultSource: Scalars['String']
    /** A list of all sources of information for this cve */
    sources: ScCVESource[]
    /** The EPSS data for the cve if available */
    epss: (EPSS | null)
    __typename: 'ScCVESourcesResult'
}


/** The health score for the image */
export interface ScoutHealthScore {
    score: Scalars['String']
    policies: ScoutHealthScorePolicy[]
    __typename: 'ScoutHealthScore'
}


/** A health score policy for an image */
export interface ScoutHealthScorePolicy {
    name: Scalars['String']
    label: Scalars['String']
    status: ScoutHealthScorePolicyStatus
    description: Scalars['String']
    violationCount: Scalars['Int']
    __typename: 'ScoutHealthScorePolicy'
}


/** The status of a health score policy */
export type ScoutHealthScorePolicyStatus = 'PASS' | 'FAIL' | 'UNKNOWN'

export type SourceType = 'VEX' | 'SCOUT'

export type StreamSummaryMode = 'CUMULATIVE_BY_PURL' | 'UNIQUE_BY_PURL' | 'UNIQUE_BY_CVE'

export interface StreamSummaryResult {
    vulnerabilityReport: VulnerabilityReport
    __typename: 'StreamSummaryResult'
}

export interface TestWebhookResult {
    success: Scalars['Boolean']
    __typename: 'TestWebhookResult'
}

export interface VEXDocument {
    documentId: Scalars['ID']
    documentUrl: Scalars['String']
    timestamp: Scalars['String']
    author: (Scalars['String'] | null)
    version: (Scalars['String'] | null)
    source: (Scalars['String'] | null)
    __typename: 'VEXDocument'
}

export interface VEXPackageScope {
    purl: Scalars['String']
    type: Scalars['String']
    namespace: (Scalars['String'] | null)
    name: Scalars['String']
    qualifiers: (Scalars['String'] | null)
    version: (Scalars['String'] | null)
    subpath: (Scalars['String'] | null)
    __typename: 'VEXPackageScope'
}

export interface VEXStatement {
    statementId: (Scalars['ID'] | null)
    timestamp: Scalars['String']
    document: VEXDocument
    cveId: Scalars['String']
    scopes: VEXStatementScope[]
    status: VEXStatementStatus
    justification: (VEXStatementJustification | null)
    statusStatement: (Scalars['String'] | null)
    __typename: 'VEXStatement'
}

export interface VEXStatementImage {
    digest: Scalars['String']
    __typename: 'VEXStatementImage'
}

export interface VEXStatementScope {
    repository: (ImageRepositoryResult | null)
    image: (VEXStatementImage | null)
    packages: (VEXPackageScope[] | null)
    __typename: 'VEXStatementScope'
}

export interface VulnerabilitiesByPackageResponse {
    items: VpPackageVulnerability[]
    __typename: 'VulnerabilitiesByPackageResponse'
}


/** An Exception, backed by either a manual exeption or a VEX statement */
export interface VulnerabilityException {
    id: Scalars['ID']
    author: (Scalars['String'] | null)
    timestamp: Scalars['String']
    vulnerability: ExceptionVulnerability
    type: ExceptionType
    imageScopes: (VulnerabilityExceptionImageScope[] | null)
    reason: (VulnerabilityExceptionReason | null)
    __typename: 'VulnerabilityException'
}

export interface VulnerabilityExceptionImageScope {
    hostName: (Scalars['String'] | null)
    repoName: (Scalars['String'] | null)
    digest: (Scalars['String'] | null)
    /** The package scopes of the vulnerability exception. null means "all packages in the image" */
    packageScopes: (VulnerabilityExceptionPackageScope[] | null)
    __typename: 'VulnerabilityExceptionImageScope'
}

export interface VulnerabilityExceptionPackageScope {
    purl: Scalars['String']
    purlFields: PurlFields
    __typename: 'VulnerabilityExceptionPackageScope'
}

export interface VulnerabilityExceptionReason {
    justification: (VEXStatementJustification | null)
    additionalDetails: (Scalars['String'] | null)
    source: ExceptionSource
    __typename: 'VulnerabilityExceptionReason'
}

export interface VulnerabilityExceptionsResult {
    items: VulnerabilityException[]
    paging: Paging
    __typename: 'VulnerabilityExceptionsResult'
}

export interface Webhook {
    id: Scalars['String']
    payloadUrl: Scalars['String']
    events: WebhookEvent[]
    signingKey: (Scalars['String'] | null)
    active: Scalars['Boolean']
    updatedAt: Scalars['String']
    __typename: 'Webhook'
}

export type WebhookEvent = 'EVERYTHING' | 'DHI_MIRROR_COMPLETED'

export interface CVEVulnerabilityState {
    /** CVSS Score of the vulnerability */
    CVSSScore: Scalars['String']
    /** CVE Severity */
    severity: Scalars['String']
    /** Whether this CVE has a fix */
    fixable: Scalars['Boolean']
    __typename: 'CVEVulnerabilityState'
}

export type FeedNotification = (NotificationNewCVE | NotificationUpdateCVE) & { __isUnion?: true }

export interface GenericWebhook {
    /** ID of the configuration. */
    ID: Scalars['String']
    /** Name of the webhook configuration. */
    name: Scalars['String']
    /** Author of the webhook configuration. */
    author: NotificationWebhookAuthor
    /** When it was last updated, in RFC3339. */
    updatedAt: Scalars['String']
    /** Webhook URL. As this is considered a secret, when set, the value will be redacted. */
    url: Scalars['String']
    /** List of repositories to consider in the filter. */
    repositories: Scalars['String'][]
    /**
     * Type of filter to apply to the repositories:
     * - Allow: Will send notifications just for the listed repositories.
     * - Block: Will send notifications for the repositories not listed.
     */
    filterType: RepositoryFilterType
    /** List of streams to filter the notifications. If empty, latest-indexed will be used. */
    streams: Scalars['String'][]
    __typename: 'GenericWebhook'
}

export interface ImageReference {
    /** Repository of the image */
    repository: Scalars['String']
    /** Package impacted by the CVE */
    impactedPackage: Scalars['String']
    __typename: 'ImageReference'
}

export interface Notification {
    id: Scalars['ID']
    organization: Scalars['String']
    title: Scalars['String']
    body: Scalars['String']
    url: Scalars['String']
    isRead: Scalars['Boolean']
    isDismissed: Scalars['Boolean']
    createdAt: Scalars['String']
    __typename: 'Notification'
}

export interface NotificationNewCVE {
    /** Event name. `new_cve` */
    event: Scalars['String']
    /** Organization */
    organization: Scalars['String']
    /** CVE that triggered the notification */
    cve: Scalars['String']
    /** Vulnerability state of the CVE */
    afterState: CVEVulnerabilityState
    /** Number of images impacted in this event */
    numImpactedImages: Scalars['Int']
    /** Some images impacted by this event */
    sampleImages: (ImageReference | null)[]
    /** Created at in RFC3339 */
    createdAt: Scalars['String']
    __typename: 'NotificationNewCVE'
}

export interface NotificationUpdateCVE {
    /** Event name. `update_cve` */
    event: Scalars['String']
    /** Organization */
    organization: Scalars['String']
    /** CVE that triggered the notification */
    cve: Scalars['String']
    /** Vulnerability state of before this CVE event */
    beforeState: CVEVulnerabilityState
    /** Vulnerability state of the CVE after this event */
    afterState: CVEVulnerabilityState
    /** Number of images impacted in this event */
    numImpactedImages: Scalars['Int']
    /** Some images impacted by this event */
    sampleImages: (ImageReference | null)[]
    /** Created at in RFC3339 */
    createdAt: Scalars['String']
    __typename: 'NotificationUpdateCVE'
}

export interface NotificationWebhookAuthor {
    /** Name of the author. */
    name: Scalars['String']
    /** Email of the author. */
    email: Scalars['String']
    __typename: 'NotificationWebhookAuthor'
}

export type NotificationWebhookResult = (GenericWebhook | SlackWebhook) & { __isUnion?: true }

export interface Repository {
    hostName: Scalars['String']
    repositoryName: Scalars['String']
    __typename: 'Repository'
}

export type RepositoryFilterType = 'ALLOW' | 'BLOCK'

export interface SlackWebhook {
    /** ID of the configuration. */
    ID: Scalars['String']
    /** Name of the webhook configuration. */
    name: Scalars['String']
    /** Author of the webhook configuration. */
    author: NotificationWebhookAuthor
    /** When it was last updated, in RFC3339. */
    updatedAt: Scalars['String']
    /** Webhook URL. As this is considered a secret, when set, the value will be redacted. */
    url: Scalars['String']
    /** List of repositories to consider in the filter. */
    repositories: Scalars['String'][]
    /**
     * Type of filter to apply to the repositories:
     * - Allow: Will send notifications just for the listed repositories.
     * - Block: Will send notifications for the repositories not listed.
     */
    filterType: RepositoryFilterType
    /**
     * @deprecated Use `weeklyReportSettings`.
     * DEPRECATED: Use weeklyReportSettings instead
     * Send weekly reports (only applies to Slack Webhook Type)
     */
    weeklyReportEnabled: Scalars['Boolean']
    /** Weekly report settings */
    weeklyReportSettings: WeeklyReportSettings
    /** List of streams to filter the notifications. If empty, latest-indexed will be used. */
    streams: Scalars['String'][]
    __typename: 'SlackWebhook'
}

export interface UserNotificationPreferencesResult {
    /** If true, the user will receive notifications for all repositories they have access to. */
    allRepositories: Scalars['Boolean']
    /** List of repositories the user wants to receive notifications for is allRepositories is false. */
    repositories: (Repository[] | null)
    __typename: 'UserNotificationPreferencesResult'
}

export type WebhookType = 'GENERIC' | 'SLACK'

export interface WeeklyReportSettings {
    /** Send weekly reports. */
    enabled: Scalars['Boolean']
    /** Exclude top fixable vulnerabilities section from the report. */
    excludeTopVulnerabilities: Scalars['Boolean']
    /** Exclude policy section from the report. */
    excludePolicies: Scalars['Boolean']
    __typename: 'WeeklyReportSettings'
}

export interface rsAcrResult {
    /** Total count of repositories. */
    repositoryCount: Scalars['Int']
    /** Registry hostname of the registry. */
    hostName: Scalars['String']
    /** Registry status. */
    status: rsRegistryStatus
    __typename: 'rsAcrResult'
}

export interface rsDockerHubResult {
    /** Total count of repositories. */
    repositoryCount: Scalars['Int']
    /** Registry hostname of the registry. */
    hostName: Scalars['String']
    /** Registry status. */
    status: rsRegistryStatus
    __typename: 'rsDockerHubResult'
}

export interface rsEcrResult {
    /** Total count of repositories. */
    repositoryCount: Scalars['Int']
    /** Registry hostname of the registry. */
    hostName: Scalars['String']
    /** Registry status. */
    status: rsRegistryStatus
    __typename: 'rsEcrResult'
}

export interface rsPageInfo {
    /** Current page number. Starts at 1. */
    page: Scalars['Int']
    /** Total number of pages. */
    total: Scalars['Int']
    /** Number of items per page. */
    pageSize: Scalars['Int']
    /** Next page number. Null if the current page is the last one. */
    nextPage: (Scalars['Int'] | null)
    /** Previous page number. Null if the current page is the first one. */
    previousPage: (Scalars['Int'] | null)
    __typename: 'rsPageInfo'
}

export type rsRegistryResult = (rsAcrResult | rsDockerHubResult | rsEcrResult) & { __isUnion?: true }

export type rsRegistryStatus = 'CONNECTED' | 'PENDING' | 'FAILED'

export interface rsRepository {
    /** Full name of the repository, including any namespace. */
    name: Scalars['String']
    /** Registry hostname of the repository. */
    registry: Scalars['String']
    /** Description of the repository. */
    description: Scalars['String']
    /** Date of creation of the repository. */
    createdAt: Scalars['String']
    /** Date of latest update of the repository. */
    updatedAt: (Scalars['String'] | null)
    /** Indicate if the repository contains images or not. */
    isEmpty: Scalars['Boolean']
    /** Indicate if the repository is enabled or not on Docker Scout. */
    enabled: Scalars['Boolean']
    /** Indicate the type of repository */
    type: rsRepositoryType
    /** Properties associated with this repository */
    properties: rsRepositoryProperties
    __typename: 'rsRepository'
}

export interface rsRepositoryListResult {
    /** Total count of repositories. */
    count: Scalars['Int']
    /** Information about the page. */
    pageInfo: rsPageInfo
    /** Registry hostname of the repositories (if at least one repository). */
    registry: Scalars['String']
    /** The skill configuration to select the right registry. */
    skill: rsSkill
    /** List of repositories. */
    repositories: (rsRepository[] | null)
    __typename: 'rsRepositoryListResult'
}

export type rsRepositoryListSortField = 'NAME' | 'CREATED_AT' | 'UPDATED_AT' | 'EMPTY' | 'ENABLED'

export interface rsRepositoryProperties {
    preventDisable: Scalars['Boolean']
    __typename: 'rsRepositoryProperties'
}

export type rsRepositoryType = 'STANDARD' | 'DHI_MIRROR'

export interface rsSkill {
    /** The namespace of the skill. */
    namespace: Scalars['String']
    /** The name of the skill. */
    name: Scalars['String']
    /**
     * Optional: not needed for Docker Hub.
     * 
     * The configuration name of the skill.
     */
    configurationName: (Scalars['String'] | null)
    __typename: 'rsSkill'
}

export interface QueryGenqlSelection{
    /** Get images by their diff IDs. */
    imagesByDiffIds?: (IbMatchedImagesGenqlSelection & { __args: {context: Context, diffIds: Scalars['ID'][]} })
    /** Get the details for a single image digest. A null result means no image was found for the supplied digest. */
    imageDetailsByDigest?: (ImageWithBaseImageGenqlSelection & { __args: {context: Context, digest: Scalars['String'], platform: ImagePlatform, repository?: (Scalars['String'] | null)} })
    /**
     * Get the list of possible image details for a digest.
     * If the digest matches an image, returns a list of a single image details.
     * If the digest matches a manifest list or image index, returns the list of all child image details.
     */
    imageDetailsListByDigest?: (ImageWithBaseImageGenqlSelection & { __args: {context: Context, digest: Scalars['String'], repository?: (Scalars['String'] | null)} })
    /**
     * Get the list of possible image details for a digest for images in DHI.
     * If the digest matches an image, returns a list of a single image details.
     * If the digest matches a manifest list or image index, returns the list of all child image details.
     */
    dhiImageDetailsListByDigest?: (ImageWithBaseImageGenqlSelection & { __args: {context?: (Context | null), digest: Scalars['String'], repository?: (Scalars['String'] | null)} })
    /**
     * @deprecated No longer supported
     * Deprecated: current clients no longer use this endpoint
     * Get vulnerabilities by image digests
     */
    imageVulnerabilitiesByDigest?: (ScImageVulnerabilitiesByDigestGenqlSelection & { __args: {context: Context, digest: Scalars['String'], query?: (ScImageVulnerabilitiesByDigestQuery | null)} })
    /**
     * Get a summary of vulnerability information about a list of images. If a workspaceId is included in the context then this team
     * is searched. Otherwise searches the public database.
     */
    imageSummariesByDigest?: (SdImageSummaryGenqlSelection & { __args: {context: Context, digests: Scalars['String'][], repository?: (ScRepositoryInput | null)} })
    /** Get packages and layers for an image digest. Returns empty if not found. */
    imagePackagesByDigest?: (IpImagePackagesByDigestGenqlSelection & { __args: {context: Context, digest: Scalars['String'], query?: (IpImagePackagesByDigestQuery | null)} })
    /** Get packages and layers for an image coordinates. Returns empty if not found. */
    imagePackagesForImageCoords?: (IpImagePackagesForImageCoordsGenqlSelection & { __args: {context: Context, query: IpImagePackagesForImageCoordsQuery} })
    /** Get packages and layers for an image coordinates for images in DHI. Returns empty if not found. */
    dhiImagePackagesForImageCoords?: (IpImagePackagesForImageCoordsGenqlSelection & { __args: {context?: (Context | null), query: IpImagePackagesForImageCoordsQuery} })
    /** Get base images by digest */
    baseImagesByDigest?: (BiImageLayersGenqlSelection & { __args: {context: Context, digest: Scalars['String']} })
    /** Returns detected secrets in the image of supplied digest. Returns null if no image found. */
    imageDetectedSecretsByDigest?: (IdDetectedSecretsGenqlSelection & { __args: {context: Context, digest: Scalars['String']} })
    /**
     * Returns tag recommendations for all tags the digest was ever tagged as. Optionally
     * filtered by repo
     */
    tagRecommendationsByDigest?: (TrRecommendedTagsGenqlSelection & { __args: {context: Context, repository?: (Scalars['String'] | null), digest: Scalars['String']} })
    /** Returns tag recommendations for digests */
    tagRecommendationsByDigests?: (TrTagRecommendationsByDigestsResultGenqlSelection & { __args: {context: Context, digests: Scalars['String'][]} })
    /** Returns tag recommendations for a single repository and tag combination */
    tagRecommendationsByRepositoryAndTag?: (TrRecommendedTagsGenqlSelection & { __args: {context: Context, repository: Scalars['String'], tag: Scalars['String']} })
    /** Returns streams */
    streams?: (ScStreamsResultGenqlSelection & { __args: {context: Context, query?: (ScStreamsQuery | null)} })
    /** Returns vulnerability reports from a stream over time */
    streamVulnerabilityReports?: (StrVulnerabilityReportsGenqlSelection & { __args: {context: Context, query: StrVulnerabilityReportsQuery} })
    /** Returns vulnerability reports from all streams over time */
    allStreamVulnerabilityReports?: (AllStrVulnerabilityReportsResultGenqlSelection & { __args: {context: Context, query: AllStrVulnerabilityReportsQuery} })
    /** Returns images for a stream */
    streamImages?: (ScStreamImagesResultGenqlSelection & { __args: {context: Context, query: ScStreamImagesQuery} })
    /** Returns packages for a stream */
    streamGroupedPackages?: (ScStreamGroupedPackagesResultGenqlSelection & { __args: {context: Context, query: ScStreamGroupedPackagesQuery} })
    /** Returns tagged images for a repository */
    taggedImagesByRepository?: (ScTaggedImagesResultGenqlSelection & { __args: {context: Context, query: ScTaggedImagesQuery} })
    /** Returns summary of base images for a stream */
    baseImagesSummaryByStream?: (ScStreamBaseImagesSummaryResultGenqlSelection & { __args: {context: Context, query: ScStreamBaseImagesSummaryQuery} })
    /** Returns a summary of cves present in a stream */
    cvesByStream?: (ScStreamCVEsResultGenqlSelection & { __args: {context: Context, query: ScStreamCVEsQuery} })
    /** Returns the vulnerability exceptions present in repo/repo+tag/digest */
    vulnerabilityDocuments?: (ScVEXsResultGenqlSelection & { __args: {context: Context, query: ScVEXsQuery} })
    /** Returns images used by base image for a stream */
    streamImagesByBaseImage?: (ScStreamImagesByBaseImageResultGenqlSelection & { __args: {context: Context, query: ScStreamImagesByBaseImageQuery} })
    /** Returns images which are affected by a given CVE */
    imagesAffectedByCVE?: (ScImagesAffectedByCVEResultGenqlSelection & { __args: {context: Context, query: ScImagesAffectedByCVEQuery} })
    /** Returns status of an organization */
    organizationStatus?: (ScOrganizationStatusGenqlSelection & { __args: {context: Context} })
    /** Returns repository details */
    repository?: (IbImageRepositoryGenqlSelection & { __args: {context: Context, query: ScRepositoryQuery} })
    /** Returns goals by digest */
    goalResultsByDigest?: (ScPolicyImageGenqlSelection & { __args: {context: Context, query: GoalResultsQuery} })
    /** Returns goals by digests */
    goalResultsByDigests?: (ScPolicyImageGenqlSelection & { __args: {context: Context, query: GoalResultsDigestsQuery} })
    /** Returns goals by initiative */
    goalResultsByInitiative?: (ScPolicyStreamResultGenqlSelection & { __args: {context: Context, query: GoalResultsInitiativeQuery} })
    /** Returns goals by policy */
    goalResults?: (ScSinglePolicyResultsGenqlSelection & { __args: {context: Context, query: GoalResultsPolicyQuery} })
    /** Returns policy summaries */
    goalResultSummaries?: (ScPolicySummaryResultGenqlSelection & { __args: {context: Context, query: PolicySummaryQuery} })
    /** Return recently discovered vulnerabilities and affected image count */
    recentCves?: (ScRecentCVEsResultGenqlSelection & { __args: {context: Context, query: ScRecentCVEsQuery} })
    /** Returns current user information */
    user?: ScUserResultGenqlSelection
    /** Returns a single VEX statement by ID */
    vexStatement?: (ScVexStatementGenqlSelection & { __args: {context: Context, id: Scalars['ID']} })
    /** Returns VEX statements, optionally filtered by query */
    vexStatements?: (ScVexStatementsQueryResultGenqlSelection & { __args: {context: Context, query: ScVexStatementsQuery} })
    /** Returns the filters available for the current organization */
    orgFilters?: (ScOrganizationFilterGenqlSelection & { __args: {context: Context} })
    serviceStatus?: ServiceStatusResultGenqlSelection
    namespaceEntitlements?: (NamespaceEntitlementsGenqlSelection & { __args: {context: Context} })
    repoFeatures?: (RepositoryFeaturesGenqlSelection & { __args: {context: Context, repoName: Scalars['String'], hostName?: (Scalars['String'] | null)} })
    reposFeatures?: (RepositoryFeatureResultGenqlSelection & { __args: {context: Context, repoNames: Scalars['String'][], hostName?: (Scalars['String'] | null)} })
    listEnabledRepos?: (EnabledRepositoriesResultGenqlSelection & { __args: {context: Context, integration?: (IntegrationConfigurationFilter | null)} })
    shouldEnableReposOnPush?: (ShouldEnableReposOnPushResultGenqlSelection & { __args: {context: Context} })
    listBlockedRepos?: (ListBlockedReposResultGenqlSelection & { __args: {context: Context, integration?: (IntegrationConfigurationFilter | null)} })
    /** Get the attestations for a given image digest */
    attestations?: (MgAttestationsResultGenqlSelection & { __args: {context: Context, query: MgAttestationsQuery} })
    /**
     * Get the attestations for a given image digest in the DHI organization. Allows public access to
     * attestations for DHI images.
     */
    dhiAttestations?: (MgAttestationsResultGenqlSelection & { __args: {context?: (Context | null), query: MgAttestationsQuery} })
    /** Get the list of attestations for a given image digest */
    attestationsList?: (MgAttestationsListResultGenqlSelection & { __args: {context: Context, query: MgAttestationsListQuery} })
    /**
     * Get the lsit of attestations for a given image digest in the DHI organization. Allows public access to
     * the list of attestations for DHI images.
     */
    dhiAttestationsList?: (MgAttestationsListResultGenqlSelection & { __args: {context?: (Context | null), query: MgAttestationsListQuery} })
    imagesWithPackage?: (PkImagesWithPackageResponseGenqlSelection & { __args: {context: Context, query: PkImagesWithPackageQuery} })
    /** Return a summary report that includes all the images in the supplied stream */
    streamSummary?: (StreamSummaryResultGenqlSelection & { __args: {context: Context, query: StreamSummaryQuery} })
    /** With the optional digest, scopes vulnerabilities based on the image in question. */
    vulnerabilitiesByPackage?: (VpPackageVulnerabilityGenqlSelection & { __args: {context: Context, packageUrls: Scalars['String'][], digest?: (Scalars['String'] | null), includeExcepted?: (Scalars['Boolean'] | null)} })
    /** Like vulnerabilitiesByPackage, but scoped to the image in question */
    vulnerabilitiesByPackageForImageCoords?: (VulnerabilitiesByPackageResponseGenqlSelection & { __args: {context: Context, query: VulnerabilitiesByPackageQuery} })
    /** Returns all the sources for a cve, broken down by source */
    cveSources?: (ScCVESourcesResultGenqlSelection & { __args: {context: Context, query: ScCVESourcesQuery} })
    vulnerabilityExceptions?: (VulnerabilityExceptionsResultGenqlSelection & { __args: {context: Context, query?: (VulnerabilityExceptionsQuery | null)} })
    vulnerabilityExceptionsApplicableToImage?: (VulnerabilityExceptionsResultGenqlSelection & { __args: {context: Context, query: VulnerabilityExceptionsApplicableToImageQuery} })
    vulnerabilityException?: (VulnerabilityExceptionGenqlSelection & { __args: {context: Context, id: Scalars['ID']} })
    /** Get the list of DHI repositories, used on the cataglog page */
    dhiRepositories?: (DhiRepositoriesResultGenqlSelection & { __args?: {context?: (Context | null), query?: (DhiRepositoriesQuery | null)} })
    /**
     * Get a DHI repository, used on the repo page. Contains all the information for the
     * various tabs on that page. e.g. the digest/tag lists. Returns null if the repository
     * does not exist.
     */
    dhiRepositoryDetails?: (DhiRepositoryDetailsResultGenqlSelection & { __args: {context?: (Context | null), query: DhiRepositoryDetailsQuery} })
    /**
     * Powers the top of the tag detail page, whilst the SBOM etc are taken from other sources.
     * Returns a list of the manifest images
     * Returns null if the repository or tag does not exist.
     */
    dhiTagDetails?: (DhiTagDetailsResultGenqlSelection & { __args: {context?: (Context | null), query: DhiTagDetailsQuery} })
    /** List all the mirrored repositories for an organization. */
    dhiListMirroredRepositories?: (DhiListMirroredRepositoriesResponseGenqlSelection & { __args: {context: Context} })
    /** Get the details of a mirrored repository by id */
    dhiGetMirroredRepository?: (DhiGetMirroredRepositoryResponseGenqlSelection & { __args: {context: Context, query: DhiGetMirroredRepositoryQuery} })
    /** Get all the mirrored repositories for a given source repository on a team */
    dhiGetMirroredRepositoriesBySourceRepository?: (DhiGetMirroredRepositoriesBySourceRepositoryResponseGenqlSelection & { __args: {context: Context, query: DhiGetMirroredRepositoriesBySourceRepositoryQuery} })
    /** List mirroring logs for a team */
    dhiListMirroringLogs?: (DhiListMirroringLogsResultGenqlSelection & { __args: {context: Context, query?: (DhiListMirroringLogsQuery | null)} })
    /** List webhooks for a team */
    listWebhooks?: (ListWebhooksResultGenqlSelection & { __args: {context: Context} })
    /** Get a particular webhook for a team */
    getWebhook?: (WebhookGenqlSelection & { __args: {context: Context, id: Scalars['String']} })
    notifications?: NotificationGenqlSelection
    notificationsFeed?: (FeedNotificationGenqlSelection & { __args: {context: Context, team?: (TeamInput | null)} })
    notificationsPusherChannels?: boolean | number
    userNotificationPreferences?: (UserNotificationPreferencesResultGenqlSelection & { __args: {context: Context} })
    notificationWebhook?: (NotificationWebhookResultGenqlSelection & { __args: {context: Context, ID: Scalars['String']} })
    notificationWebhooks?: (NotificationWebhookResultGenqlSelection & { __args: {context: Context, filter?: (NotificationWebhookFilterInput | null)} })
    rsListRepositories?: (rsRepositoryListResultGenqlSelection & { __args: {context: Context, input: rsRepositoryListInput} })
    rsListRegistries?: (rsRegistryResultGenqlSelection & { __args: {context: Context} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationGenqlSelection{
    indexImage?: (IndexImageResultGenqlSelection & { __args: {context: Context, image: IndexImageInput} })
    addImageToStream?: (AddImageToStreamResultGenqlSelection & { __args: {context: Context, input: AddImageToStreamInput} })
    setStreamImages?: (SetStreamImagesResultGenqlSelection & { __args: {context: Context, input: SetStreamImagesInput} })
    addVulnerabilityException?: (AddVulnerabilityExceptionResultGenqlSelection & { __args: {context: Context, input: AddVulnerabilityExceptionInput} })
    updateVulnerabilityException?: (UpdateVulnerabilityExceptionResultGenqlSelection & { __args: {context: Context, input: UpdateVulnerabilityExceptionInput} })
    removeVulnerabilityException?: (RemoveVulnerabilityExceptionResultGenqlSelection & { __args: {context: Context, input: RemoveVulnerabilityExceptionInput} })
    enrollIntoScout?: (ScoutEnrollmentGenqlSelection & { __args: {context: Context} })
    setRepoVulnerabilityReporting?: (VulnerabilityReportingRepoFeatureGenqlSelection & { __args: {context?: (Context | null), reporting: RepoVulnerabilityReportingInput, integration?: (IntegrationConfigurationInput | null)} })
    setMultiRepoVulnerabilityReporting?: (VulnerabilityReportingResultGenqlSelection & { __args: {context?: (Context | null), reporting: MultiRepoVulnerabilityReportingInput, integration?: (IntegrationConfigurationInput | null)} })
    setEnableReposOnPush?: (SetEnableReposOnPushResultGenqlSelection & { __args: {context: Context, input: SetEnableReposOnPushInput} })
    setReposBlocked?: (BlockedRepoResultGenqlSelection & { __args: {context: Context, input: ReposBlockedInput, integration?: (IntegrationConfigurationInput | null)} })
    /**
     * Set the repository to be mirrored. This will also start the mirroring process.
     * Requires owner access to the destination organization.
     * Source repository must exist.
     * Destination repository name must start with dhi-
     * Destination repository namespace must match the organization in the context.
     */
    dhiSetMirroredRepository?: (DhiSetMirroredRepositoryResponseGenqlSelection & { __args: {context: Context, input: DhiSetMirroredRepositoryInput} })
    /**
     * Remove mirroring on a repository. This will stop new images being mirrored.
     * Requires owner access to the destination organization.
     */
    dhiRemoveMirroredRepository?: (MutationResponseGenqlSelection & { __args: {context: Context, input: DhiRemoveMirroredRepositoryInput} })
    /** Create a webhook */
    createWebhook?: (WebhookGenqlSelection & { __args: {context: Context, input: CreateWebhookInput} })
    /** Update a webhook */
    updateWebhook?: (WebhookGenqlSelection & { __args: {context: Context, input: UpdateWebhookInput} })
    /** Delete a webhook */
    deleteWebhook?: (DeleteWebhookResultGenqlSelection & { __args: {context: Context, id: Scalars['String']} })
    /** Test a webhook */
    testWebhook?: (TestWebhookResultGenqlSelection & { __args: {context: Context, id: Scalars['String']} })
    updateNotification?: (NotificationGenqlSelection & { __args: {id: Scalars['ID'], update: NotificationUpdateInput} })
    dismissAllNotifications?: boolean | number
    setUserNotificationPreferences?: (UserNotificationPreferencesResultGenqlSelection & { __args: {context: Context, input: UserNotificationPreferencesInput} })
    addNotificationWebhook?: (NotificationWebhookResultGenqlSelection & { __args: {context: Context, input: AddNotificationWebhookInput} })
    updateNotificationWebhook?: (NotificationWebhookResultGenqlSelection & { __args: {context: Context, input: UpdateNotificationWebhookInput} })
    removeNotificationWebhook?: { __args: {context: Context, ID: Scalars['String']} }
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AddImageToStreamInput {stream: Scalars['String'],image: Scalars['String'],appName?: (Scalars['String'] | null),platform?: (ImagePlatform | null)}

export interface AddImageToStreamResultGenqlSelection{
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AddVulnerabilityExceptionInput {cveId: Scalars['String'],type: ScVulnerabilityExceptionType,justification?: (ScVexStatementJustification | null),additionalDetails: Scalars['String'],imageScopes?: (ScVexStatementImageScopeInput[] | null)}

export interface AddVulnerabilityExceptionResultGenqlSelection{
    exception?: ScVulnerabilityExceptionGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** All stream vulnerability reports */
export interface AllStrVulnerabilityReportsGenqlSelection{
    /** The stream the vulnerability report belongs to */
    stream?: boolean | number
    /** The vulnerability reports over time */
    reports?: TimestampedVulnerabilityReportGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** All stream vulnerability reports query */
export interface AllStrVulnerabilityReportsQuery {
/** The list of streams to retrieve reports from */
streams?: (Scalars['String'][] | null),
/** How to summarize the vulnerabilities for the report (defaults to CUMULATIVE) */
summaryType?: (StrVulnerabilityReportsSummaryType | null),
/** The timescale over which to retrieve information (defaults to 7d) */
timescale?: (StrVulnerabilityReportsQueryTimescale | null)}


/** All stream vulnerability reports response */
export interface AllStrVulnerabilityReportsResultGenqlSelection{
    /** The vulnerability reports over time grouped by stream */
    items?: AllStrVulnerabilityReportsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BaseScPolicyGenqlSelection{
    /** Name of the policy definition */
    definitionName?: boolean | number
    /** Name of the policy configuration */
    configurationName?: boolean | number
    /** Display name of the configured policy */
    displayName?: boolean | number
    /** Human-readable description of the configured policy */
    description?: boolean | number
    /** Whether policy has been evaluated */
    evaluated?: boolean | number
    /** The latest delta for the policy, regardless of reason (the change in policy results since the specified timestamp) */
    latestDelta?: ScPolicyDeltaGenqlSelection
    /** The available remediations for this policy result */
    remediations?: (ScRemediationGenqlSelection & { __args: {filter: ScRemediationFilter} })
    on_ScBooleanPolicy?: ScBooleanPolicyGenqlSelection
    on_ScGenericPolicy?: ScGenericPolicyGenqlSelection
    on_ScLicencePolicy?: ScLicencePolicyGenqlSelection
    on_ScVulnerabilityPolicy?: ScVulnerabilityPolicyGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BaseScVulnerabilityExceptionSourceGenqlSelection{
    id?: boolean | number
    on_ScVulnerabilityExceptionScoutSource?: ScVulnerabilityExceptionScoutSourceGenqlSelection
    on_ScVulnerabilityExceptionVEXSource?: ScVulnerabilityExceptionVEXSourceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returns layer ordinals and the base images that those ordinals are for */
export interface BiImageLayersGenqlSelection{
    /** The list of layers that the base image matches */
    layerMatches?: BiLayerMatchGenqlSelection
    /** A list of images which were matched. Can be multiple images if the image has been pushed to more than one repository. */
    images?: IbBaseImageGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BiLayerMatchGenqlSelection{
    layerOrdinal?: boolean | number
    layerDigest?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CommonImageGenqlSelection{
    /** The digest of this image. */
    digest?: boolean | number
    /** A list of tags associated with this image. */
    tags?: IbTagGenqlSelection
    /** The creation date of this image represented as an ISO8601 string. */
    createdAt?: boolean | number
    /** The number of packages present on this image (if known). */
    packageCount?: boolean | number
    /** The Dockerfile associated with this image (if known). */
    dockerFile?: IbDockerFileGenqlSelection
    /** A report of any vulnerabilities this image associated with this image. */
    vulnerabilityReport?: IbVulnerabilityReportGenqlSelection
    /** The repository that this image belongs to. */
    repository?: IbImageRepositoryGenqlSelection
    /** The state of SBOM generation for this image */
    sbomState?: boolean | number
    /** The number of changesets (histories|layers) this image contains */
    layerCount?: boolean | number
    /** The image os and architecture */
    platform?: IbImagePlatformGenqlSelection
    /** The compressed size of the image */
    compressedSize?: boolean | number
    /** The labels for this image */
    labels?: IbLabelGenqlSelection
    /** The media type of the manifest */
    mediaType?: boolean | number
    on_IbBaseImage?: IbBaseImageGenqlSelection
    on_IbImage?: IbImageGenqlSelection
    on_ImageWithBaseImage?: ImageWithBaseImageGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Shared types. */
export interface Context {
/**
 * Deprecated: Use organization instead.
 * The repository org or namespace to run the query against. If provided you will need to have
 * passed a token that allows you access to read this Org. If not provided the query will run
 * against public data.
 */
namespace?: (Scalars['String'] | null),
/**
 * The repository organization to run the query against. If provided you will need to have
 * passed a token that allows you access to read this Org. If not provided the query will run
 * against public data.
 */
organization?: (Scalars['String'] | null),
/**
 * Optional: only required when you want non-public data and there is no namespace provided.
 * 
 * The historical teamId that corresponds to the desired namespace. If provided you will need
 * to have passed a token that allows you access to read this team.
 */
teamId?: (Scalars['String'] | null)}


/** Holds metadata of the detected secret. */
export interface DetectedSecretGenqlSelection{
    /** The source of the detected secret. */
    source?: DetectedSecretSourceGenqlSelection
    /** The findings of the detected secret. */
    findings?: SecretFindingGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** The source of the detected secret. */
export interface DetectedSecretSourceGenqlSelection{
    /** The type of the detected secret. */
    type?: boolean | number
    /** The location of the detected secret. */
    location?: DetectedSecretSourceLocationGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** The location of where the secret was detected. */
export interface DetectedSecretSourceLocationGenqlSelection{
    /** The path of where the secret was detected. Present if the secret was found in a FILE. */
    path?: boolean | number
    /** The ordinal of the layer in which the secret was discovered. */
    ordinal?: boolean | number
    /** The digest of the layer in which the secret was discovered. */
    digest?: boolean | number
    /** The diffId of the layer in which the secret was discovered. */
    diffId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DockerfileLineGenqlSelection{
    number?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DockerOrgGenqlSelection{
    /** The name of this organization */
    name?: boolean | number
    /** The role of the user in this organization */
    role?: boolean | number
    /** The avatar url of this organization */
    avatarUrl?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EPSSGenqlSelection{
    /** the epss score */
    score?: boolean | number
    /** the epss percentile */
    percentile?: boolean | number
    /**
     * The priority of the EPSS entry based on percentile.
     * >=0.9: CRITICAL
     * >=0.4: HIGH
     * >=0.05: STANDARD
     * <0.05: LOWEST
     */
    priority?: boolean | number
    /** A description of the EPSS priority */
    priorityDescription?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GoalResultsDigestsQuery {digests: Scalars['String'][]}

export interface GoalResultsInitiativeQuery {
/** The initiative to query for */
initiative: Scalars['String'],
/** Specify the stream to filter by */
stream?: (Scalars['String'] | null),
/** Specify the paging parameters for the query */
paging?: (PagingInput | null),
/** Specify any filtering for the query */
filter?: (GoalResultsInitiativeQueryFilter | null),
/** Specify the point in time that deltas are calculated from */
deltaTimestamp?: (Scalars['String'] | null)}

export interface GoalResultsInitiativeQueryFilter {
/** The repos to return images for */
repos?: (Scalars['String'][] | null)}

export interface GoalResultsPolicyQuery {
/** Specify the policy definition to fetch results for */
definitionName: Scalars['String'],
/** Specify the policy configuration to fetch results for */
configurationName: Scalars['String'],
/** Specify the stream to filter by */
stream: Scalars['String'],
/** Specify the paging parameters for the query */
paging?: (PagingInput | null),
/** Specify any filtering for the query */
filter?: (GoalResultsQueryFilter | null),
/** Specify the point in time that deltas are calculated from */
deltaTimestamp?: (Scalars['String'] | null)}

export interface GoalResultsQuery {digest: Scalars['String']}

export interface GoalResultsQueryFilter {
/** Specify the policy state to fetch results for */
policyState?: (ScPolicyState | null),
/** If specified, only images for which the specified hub teams has access to will be matched. */
hubTeams?: (Scalars['String'][] | null),
/** If specified, only images containing the specified label or annotation key-value pairs will be matched. */
kvs?: (KVFilterInput[] | null)}

export interface IbAttestationGenqlSelection{
    /** The predicate type of the attestation */
    predicateType?: boolean | number
    on_IbAttestationGeneric?: IbAttestationGenericGenqlSelection
    on_IbAttestationProvenance?: IbAttestationProvenanceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * Implementation for attestations that don't
 * have specific fields or that we don't
 * handle yet.
 */
export interface IbAttestationGenericGenqlSelection{
    /** The predicate type of the attestation */
    predicateType?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IbAttestationProvenanceGenqlSelection{
    /** The predicate type of the attestation */
    predicateType?: boolean | number
    base?: IbBaseImageProvenanceGenqlSelection
    dockerfile?: IbDockerfileProvenanceGenqlSelection
    git?: IbGitProvenanceGenqlSelection
    materials?: IbMaterialProvenanceGenqlSelection
    /** The BuildKit provenance mode */
    mode?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** This type represents a base Docker image. */
export interface IbBaseImageGenqlSelection{
    /** The digest of this image. */
    digest?: boolean | number
    /** A list of tags associated with this image. */
    tags?: IbTagGenqlSelection
    /** The creation date of this image represented as an ISO8601 string. */
    createdAt?: boolean | number
    /** The number of packages present on this image (if known). */
    packageCount?: boolean | number
    /** The Dockerfile associated with this image (if known). */
    dockerFile?: IbDockerFileGenqlSelection
    /** A report of any vulnerabilities this image associated with this image. */
    vulnerabilityReport?: IbVulnerabilityReportGenqlSelection
    /** The repository that this image belongs to. */
    repository?: IbImageRepositoryGenqlSelection
    /** The state of SBOM generation for this image */
    sbomState?: boolean | number
    /** The number of changesets (histories|layers) this image contains */
    layerCount?: boolean | number
    /** The image os and architecture */
    platform?: IbImagePlatformGenqlSelection
    /** The compressed size of the image */
    compressedSize?: boolean | number
    /** The labels for this image */
    labels?: IbLabelGenqlSelection
    /** The media type of the manifest */
    mediaType?: boolean | number
    /**
     * The provenance attestation containing the remaining information
     * which allows us to know exactly how this base was referenced
     * in the original image
     */
    provenanceAttestation?: IbProvenanceAttestationGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IbBaseImageProvenanceGenqlSelection{
    digest?: boolean | number
    platform?: IbImagePlatformGenqlSelection
    repository?: boolean | number
    tag?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** This type represents the Dockerfile which was used to build an image. */
export interface IbDockerFileGenqlSelection{
    /** The path to the Dockerfile within a Git repo. */
    path?: boolean | number
    /** The commit at which this Dockerfile was used to build the image (if known). */
    commit?: IbGitCommitGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IbDockerfileProvenanceGenqlSelection{
    /** The sha of the Dockerfile */
    sha?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** This type represents a Git commit. */
export interface IbGitCommitGenqlSelection{
    /** The SHA of the commit. */
    sha?: boolean | number
    /** The repository on which the commit was made (if known). */
    repository?: IbGitRepositoryGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IbGithubPullRequestGenqlSelection{
    providerUrl?: boolean | number
    sourceId?: boolean | number
    author?: IbGitUserGenqlSelection
    createdAt?: boolean | number
    destinationRef?: IbGitRefGenqlSelection
    mergedBy?: IbGitUserGenqlSelection
    requestedReviewers?: IbGitUserGenqlSelection
    sourceRef?: IbGitRefGenqlSelection
    state?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IbGitOrgGenqlSelection{
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IbGitProvenanceGenqlSelection{
    /** The url for the git commit; only handles GitHub at the moment */
    commitUrl?: boolean | number
    /** The sha of the git commit */
    sha?: boolean | number
    /** The source of the git commit */
    source?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IbGitPullRequestGenqlSelection{
    providerUrl?: boolean | number
    author?: IbGitUserGenqlSelection
    createdAt?: boolean | number
    destinationRef?: IbGitRefGenqlSelection
    mergedBy?: IbGitUserGenqlSelection
    sourceRef?: IbGitRefGenqlSelection
    state?: boolean | number
    on_IbGithubPullRequest?: IbGithubPullRequestGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IbGitRefGenqlSelection{
    name?: boolean | number
    repo?: IbGitRepoGenqlSelection
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IbGitRepoGenqlSelection{
    name?: boolean | number
    org?: IbGitOrgGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** This type represents a Git repository. */
export interface IbGitRepositoryGenqlSelection{
    /** The name of the organization in which the Git repository belongs. */
    orgName?: boolean | number
    /** The name of the repository. */
    repoName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IbGitUserGenqlSelection{
    username?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** This type represents a Docker image. */
export interface IbImageGenqlSelection{
    /** The digest of this image. */
    digest?: boolean | number
    /** A list of tags associated with this image. */
    tags?: IbTagGenqlSelection
    /** The creation date of this image represented as an ISO8601 string. */
    createdAt?: boolean | number
    /** The number of packages present on this image (if known). */
    packageCount?: boolean | number
    /** The Dockerfile associated with this image (if known). */
    dockerFile?: IbDockerFileGenqlSelection
    /** A report of any vulnerabilities this image associated with this image. */
    vulnerabilityReport?: IbVulnerabilityReportGenqlSelection
    /** The repository that this image belongs to. */
    repository?: IbImageRepositoryGenqlSelection
    /** The state of SBOM generation for this image */
    sbomState?: boolean | number
    /** The number of changesets (histories|layers) this image contains */
    layerCount?: boolean | number
    /** The list of changesets (layer|history) of the image */
    changesets?: ScImageChangesetGenqlSelection
    /** The image os and architecture */
    platform?: IbImagePlatformGenqlSelection
    /** The compressed size of the image */
    compressedSize?: boolean | number
    /** The labels for this image */
    labels?: IbLabelGenqlSelection
    /** The media type of the manifest */
    mediaType?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IbImagePlatformGenqlSelection{
    /** The OS (Operating System) of the image, eg. linux */
    os?: boolean | number
    /** The chip architecture of the image, eg. arm64 */
    architecture?: boolean | number
    /** The OS variant of the image */
    variant?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** This type represents a Docker image repository. */
export interface IbImageRepositoryGenqlSelection{
    /** The hostname of the repository. */
    hostName?: boolean | number
    /** The name of the repository. */
    repoName?: boolean | number
    /** An optional badge describing the repository's status. */
    badge?: boolean | number
    /** A list of the repository's supported tags */
    supportedTags?: boolean | number
    /** A list of the repository's preferred tags */
    preferredTags?: boolean | number
    /** The description of the repository */
    description?: boolean | number
    /** Pull count if they are available */
    pullCount?: boolean | number
    /** Star count if available */
    starCount?: boolean | number
    /** List of platforms in the repository, if available */
    platforms?: boolean | number
    /** The digest of the previously scanned image or index (if any) */
    previousScannedDigest?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** This type represents a label for an image */
export interface IbLabelGenqlSelection{
    /** The key of the label */
    key?: boolean | number
    /** The value of the label */
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** This type lists the images which were matched against the input ID matches which were used to generate the chain ID which found them. */
export interface IbMatchedImagesGenqlSelection{
    /** A list of input IDs (depending on the query used) which were used to generate the chain ID under which the images were found. */
    matches?: boolean | number
    /** A list of images which were matched. */
    images?: IbImageGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IbMaterialProvenanceGenqlSelection{
    /** The digest of the material */
    digest?: boolean | number
    /** The uri of the material */
    uri?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IbProvenanceAttestationGenqlSelection{
    digest?: boolean | number
    tag?: boolean | number
    repository?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * This type represents a tag which is associated with an image, either directly
 * or indirectly (via an image index).
 */
export interface IbTagGenqlSelection{
    /** The name of the tag. */
    name?: boolean | number
    /** A timestamp indicating when this tag was last updated (if available) */
    updatedAt?: boolean | number
    /** Whether this tag currently points to this image. */
    current?: boolean | number
    /** Whether this tag appears in the list of supported tags. */
    supported?: boolean | number
    /** The digest of the image, or image index, the tag is directly associated with (if current). */
    digest?: boolean | number
    /** The media type of the image, or image index, the tag is directly associated with (if current). */
    mediaType?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** This type represents a vulnerability report about an image. */
export interface IbVulnerabilityReportGenqlSelection{
    /** The number of critical severity vulnerabilities present in the image. */
    critical?: boolean | number
    /** The number of high severity vulnerabilities present in the image. */
    high?: boolean | number
    /** The number of medium severity vulnerabilities present in the image. */
    medium?: boolean | number
    /** The number of low severity vulnerabilities present in the image. */
    low?: boolean | number
    /** The number of vulnerabilities with an unspecified severity present in the image. */
    unspecified?: boolean | number
    /** The total number of vulnerabilities present in the image. */
    total?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** The detected secrets for the supplied image digest */
export interface IdDetectedSecretsGenqlSelection{
    /** Get base images by digest */
    digest?: boolean | number
    /** Any secrets found on the image. Empty if none found. */
    secrets?: DetectedSecretGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ImageHistoryGenqlSelection{
    /**
     * Indicate if this is an empty layer (without any attached blob) or not
     * If emptyLayer is true, layer will not be set
     */
    emptyLayer?: boolean | number
    /** The layer details if not empty */
    layer?: ImageLayerGenqlSelection
    /** The history ordinal */
    ordinal?: boolean | number
    /** The creation date of this history entry represented as an ISO8601 string. */
    createdAt?: boolean | number
    /** Instruction to create this history entry */
    createdBy?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ImageLayerGenqlSelection{
    /** The digest of the layer blob */
    digest?: boolean | number
    /** Media Type of the blob */
    mediaType?: boolean | number
    /** The diff-id of the image layer */
    diffId?: boolean | number
    /** The dockerfile lines which created this layer */
    fileLines?: DockerfileLineGenqlSelection
    /** Size of the layer blob */
    size?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A type describing the platform attributes used to select an image */
export interface ImagePlatform {os: Scalars['String'],architecture: Scalars['String'],variant?: (Scalars['String'] | null)}

export interface ImageWithBaseImageGenqlSelection{
    /** The digest of this image. */
    digest?: boolean | number
    /** A list of tags associated with this image. */
    tags?: IbTagGenqlSelection
    /** The creation date of this image represented as an ISO8601 string. */
    createdAt?: boolean | number
    /** The number of packages present on this image (if known). */
    packageCount?: boolean | number
    /** The Dockerfile associated with this image (if known). */
    dockerFile?: IbDockerFileGenqlSelection
    /** A report of any vulnerabilities this image associated with this image. */
    vulnerabilityReport?: IbVulnerabilityReportGenqlSelection
    /** The repository that this image belongs to. */
    repository?: IbImageRepositoryGenqlSelection
    /** The state of SBOM generation for this image */
    sbomState?: boolean | number
    /** The number of changesets (histories|layers) this image contains */
    layerCount?: boolean | number
    /** The image os and architecture */
    platform?: IbImagePlatformGenqlSelection
    /** The base image of this image */
    baseImage?: IbImageGenqlSelection
    /** The base image tag that was used */
    baseImageTag?: IbTagGenqlSelection
    /** The list of histories of the image */
    histories?: ImageHistoryGenqlSelection
    /** The list of changesets (layer|history) of the image */
    changesets?: ScImageChangesetGenqlSelection
    /** The list of streams this image is present in */
    streams?: ScStreamGenqlSelection
    /** The compressed size of the image */
    compressedSize?: boolean | number
    /** The labels for this image */
    labels?: IbLabelGenqlSelection
    /** The media type of the manifest */
    mediaType?: boolean | number
    /** The attestations for this image */
    attestations?: IbAttestationGenqlSelection
    /** The user this image uses */
    user?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IndexImageInput {digest: Scalars['String'],repository: Scalars['String'],tags?: (Scalars['String'][] | null)}

export interface IndexImageResultGenqlSelection{
    digest?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** An image layer */
export interface IpImageLayerGenqlSelection{
    /**
     * For reasons that appear to be lost to time, this is actually the blob/digest, NOT the
     * blob/diffId. As far as I know the blob digest represents the digest of the compressed
     * change, whereas the diffId represents the digest of the uncompressed layer tar.
     */
    diffId?: boolean | number
    /** The layer ordinal */
    ordinal?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Contains a list of image layers */
export interface IpImageLayersGenqlSelection{
    /** The list of image layers */
    layers?: IpImageLayerGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** An image package */
export interface IpImagePackageGenqlSelection{
    /** The package details */
    package?: PackageGenqlSelection
    /**
     * The locations that the package appears in. A package is often found in multiple locations
     * in a docker image
     */
    locations?: PackageLocationGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Contains a list of image packages */
export interface IpImagePackagesGenqlSelection{
    /** The list of image packages */
    packages?: IpImagePackageGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Contains the packages and layers for an image */
export interface IpImagePackagesByDigestGenqlSelection{
    /** The digest of the docker image */
    digest?: boolean | number
    /** The indexing state of the image with the supplied digest */
    sbomState?: boolean | number
    /** Holds the packages that the docker image contains */
    imagePackages?: IpImagePackagesGenqlSelection
    /** Holds the layers that make up the docker image */
    imageLayers?: IpImageLayersGenqlSelection
    /** The list of histories of the image */
    imageHistories?: ImageHistoryGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IpImagePackagesByDigestQuery {
/**
 * TODO: This attribute is not yet implemented.
 * Include excepted vulnerabilities in the response (defaults to false)
 */
includeExcepted?: (Scalars['Boolean'] | null),
/** Include public images even if org/team context is provided */
includePublic?: (Scalars['Boolean'] | null)}


/** Contains the packages and layers for an image */
export interface IpImagePackagesForImageCoordsGenqlSelection{
    /** The digest of the docker image */
    digest?: boolean | number
    hostName?: boolean | number
    repoName?: boolean | number
    /** The indexing state of the image with the supplied digest */
    sbomState?: boolean | number
    /** Holds the packages that the docker image contains */
    imagePackages?: IpImagePackagesGenqlSelection
    /** Holds the layers that make up the docker image */
    imageLayers?: IpImageLayersGenqlSelection
    /** The list of histories of the image */
    imageHistories?: ImageHistoryGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IpImagePackagesForImageCoordsQuery {digest: Scalars['String'],hostName: Scalars['String'],repoName: Scalars['String'],
/** Include excepted vulnerabilities in the response (defaults to false) */
includeExcepted?: (Scalars['Boolean'] | null),
/** Include public images even if org/team context is provided */
includePublic?: (Scalars['Boolean'] | null)}

export interface KVFilterInput {key: Scalars['String'],values: Scalars['String'][]}


/** A package */
export interface PackageGenqlSelection{
    /** The name of the package */
    name?: boolean | number
    /** An optional description of a package */
    description?: boolean | number
    /** The package url */
    purl?: boolean | number
    /** The package purl fields */
    purlFields?: ScPurlGenqlSelection
    /** The type of the package */
    type?: boolean | number
    /** The namespace of the package */
    namespace?: boolean | number
    /** The version of the package */
    version?: boolean | number
    /** The optional author of a package */
    author?: boolean | number
    /** An optional list of package licenses */
    licenses?: boolean | number
    /** A list of vulnerabilities that this package is vulnerable to */
    vulnerabilities?: VpVulnerabilityGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** The location of a package */
export interface PackageLocationGenqlSelection{
    /** The path of the package */
    path?: boolean | number
    /** The diffId of the layer that owns this location */
    diffId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PagingGenqlSelection{
    /** The total number of items if available */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PagingInput {
/** Desired page size (otherwise will use a default value) */
pageSize?: (Scalars['Int'] | null),
/** Page index (defaults to first page) */
page?: (Scalars['Int'] | null)}

export interface PkVexStatementGenqlSelection{
    /** The author of the exception - present if MANUAL_EXCEPTION and was set */
    author?: boolean | number
    /** The timestamp of the exception */
    timestamp?: boolean | number
    /** The source type of the exception, VEX_STATEMENT or MANUAL_EXCEPTION */
    sourceType?: boolean | number
    /** The id of the exception, used with sourceType to identify and lookup the exception details */
    id?: boolean | number
    /** The type of the exception */
    type?: boolean | number
    /** The justification for the exception */
    justification?: boolean | number
    /** The URL of the document that contains the exception if type is VEX_STATEMENT */
    documentUrl?: boolean | number
    /** The status of the exception, only present if sourceType is VEX_STATEMENT */
    status?: boolean | number
    /**
     * Additional details about the exception, only present if sourceType is MANUAL_EXCEPTION
     * although is an optional field so may be null regardless
     */
    additionalDetails?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PkVulnerabilityExceptionGenqlSelection{
    /** The author of the exception - present if MANUAL_EXCEPTION and was set */
    author?: boolean | number
    /** The timestamp of the exception */
    timestamp?: boolean | number
    /** The source type of the exception, VEX_STATEMENT or MANUAL_EXCEPTION */
    sourceType?: boolean | number
    /** The id of the exception, used with sourceType to identify and lookup the exception details */
    id?: boolean | number
    /** The type of the exception */
    type?: boolean | number
    /** The justification for the exception */
    justification?: boolean | number
    /** The URL of the document that contains the exception if type is VEX_STATEMENT */
    documentUrl?: boolean | number
    /** The status of the exception, only present if sourceType is VEX_STATEMENT */
    status?: boolean | number
    /**
     * Additional details about the exception, only present if sourceType is MANUAL_EXCEPTION
     * although is an optional field so may be null regardless
     */
    additionalDetails?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PolicySummaryQuery {
/** Specify the stream to filter by */
stream?: (Scalars['String'] | null),
/** Specify the point in time that deltas are calculated from */
deltaTimestamp?: (Scalars['String'] | null),
/** Specify the policy definition to fetch summary for */
definitionName?: (Scalars['String'] | null),
/** Specify the policy configuration to fetch summary for */
configurationName?: (Scalars['String'] | null),
/** Specify any filtering for the query */
filter?: (PolicySummaryQueryFilter | null),
/** Org-specific filters to apply */
orgFilters?: (ScOrganizationFilterInput[] | null)}

export interface PolicySummaryQueryFilter {
/** The repos to return results for */
repos?: (ScRepositoryInput[] | null),
/** If specified, only images for which the specified hub teams has access to will be matched. */
hubTeams?: (Scalars['String'][] | null),
/** If specified, only images containing the specified label or annotation key-value pairs will be matched. */
kvs?: (KVFilterInput[] | null)}

export interface RemoveVulnerabilityExceptionInput {ids: Scalars['ID'][]}

export interface RemoveVulnerabilityExceptionResultGenqlSelection{
    ids?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScBaseImageSummaryGenqlSelection{
    /** The repository of these base images. */
    repository?: IbImageRepositoryGenqlSelection
    /** The number of different images used as base images from this repository. */
    imageCount?: boolean | number
    /** The number of images using one of those base images. */
    childImageCount?: boolean | number
    /** Range of packages across the base images. */
    packages?: ScPackageRangeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScBooleanPolicyGenqlSelection{
    /** Name of the policy definition */
    definitionName?: boolean | number
    /** Name of the policy configuration */
    configurationName?: boolean | number
    /** Display name of the configured policy */
    displayName?: boolean | number
    /** Human-readable description of the configured policy */
    description?: boolean | number
    /** Whether policy has been evaluated */
    evaluated?: boolean | number
    /** The latest result of evaluating the policy */
    currentResult?: ScBooleanPolicyResultGenqlSelection
    /** The latest delta for the policy, regardless of reason (the change in policy results since the specified timestamp) */
    latestDelta?: ScPolicyDeltaGenqlSelection
    /**
     * "
     * The available remediations for this policy result
     */
    remediations?: (ScRemediationGenqlSelection & { __args: {filter: ScRemediationFilter} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScBooleanPolicyResultGenqlSelection{
    statusLabel?: boolean | number
    createdDateTime?: boolean | number
    hasDeviation?: boolean | number
    deviation?: ScPolicyResultGenericDeviationGenqlSelection
    /** If changes have been made to the policy that haven't been evaluated */
    isStale?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScDockerRepositoryGenqlSelection{
    /** Hostname of the Docker registry */
    hostName?: boolean | number
    /** Name of the Docker repository */
    repoName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScGenericPolicyGenqlSelection{
    /** Name of the policy definition */
    definitionName?: boolean | number
    /** Name of the policy configuration */
    configurationName?: boolean | number
    /** Display name of the configured policy */
    displayName?: boolean | number
    /** Human-readable description of the configured policy */
    description?: boolean | number
    /** Whether policy has been evaluated */
    evaluated?: boolean | number
    /** The latest result of evaluating the policy */
    currentResult?: ScGenericPolicyResultGenqlSelection
    /** The latest delta for the policy, regardless of reason (the change in policy results since the specified timestamp) */
    latestDelta?: ScPolicyDeltaGenqlSelection
    /**
     * "
     * The available remediations for this policy result
     */
    remediations?: (ScRemediationGenqlSelection & { __args: {filter: ScRemediationFilter} })
    /** Link to docs about remediating policy violations */
    remediationLink?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScGenericPolicyResultGenqlSelection{
    statusLabel?: boolean | number
    deviations?: ScPolicyResultGenericDeviationGenqlSelection
    deviationCount?: boolean | number
    createdDateTime?: boolean | number
    /** If changes have been made to the policy that haven't been evaluated */
    isStale?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScGroupedPackageGenqlSelection{
    /** The package root (without the version) */
    packageRoot?: ScPackageRootGenqlSelection
    /** Number of used package versions with this packageRoot */
    versionCount?: boolean | number
    /**
     * @deprecated No longer supported
     * Deprecated: Use imageCount instead and imagesWithPackage for more detail
     * This will return an empty list
     */
    repositories?: ScDockerRepositoryGenqlSelection
    uniqueVulnerabilityReport?: VulnerabilityReportGenqlSelection
    /**
     * @deprecated No longer supported
     * Deprecated: Use imageCount instead and imagesWithPackage for more detail
     * This will return an empty list
     */
    images?: ScImageRepositoryGenqlSelection
    /** The number of images that use this package */
    imageCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScGroupedPackagesFilter {packageName?: (Scalars['String'] | null),packageType?: (Scalars['String'] | null)}

export interface ScGroupedPackagesOrdering {field?: (ScGroupedPackagesOrderingField | null),sortOrder?: (SortOrder | null)}

export interface ScImageAffectedByCVEGenqlSelection{
    /** The affected image */
    affectedImage?: ImageWithBaseImageGenqlSelection
    /** The affected packages for the associated image */
    affectedPackages?: ScImageAffectedByCVEPackageGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScImageAffectedByCVEChangesetGenqlSelection{
    /** The changeset ordinal */
    ordinal?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScImageAffectedByCVEPackageGenqlSelection{
    /** The version of the package */
    version?: boolean | number
    /** The namespace of the package */
    namespace?: boolean | number
    /** The name of the package */
    name?: boolean | number
    /** The operating system name of the package, if applicable */
    osName?: boolean | number
    /** The operating system version of the package, if applicable */
    osVersion?: boolean | number
    /** The type of the package */
    type?: boolean | number
    /** The packageUrl or purl */
    purl?: boolean | number
    /** The changeset that this package is included in */
    changesets?: ScImageAffectedByCVEChangesetGenqlSelection
    /**
     * @deprecated No longer supported
     * Deprecated: This is no longer part of this api and will return an empty list for the sake of
     * not breaking any existing clients
     */
    locations?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * This type represents an image changeset, which is one of the following
 * * history with an empty layer
 * * history with a layer
 * * layer without a history
 */
export interface ScImageChangesetGenqlSelection{
    history?: ScImageHistoryGenqlSelection
    layer?: ScImageLayerGenqlSelection
    ordinal?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScImageHistoryGenqlSelection{
    createdAt?: boolean | number
    createdBy?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScImageLayerGenqlSelection{
    digest?: boolean | number
    mediaType?: boolean | number
    size?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScImageRepositoryGenqlSelection{
    digest?: boolean | number
    repository?: ScDockerRepositoryGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScImagesAffectedByCVEFilter {
/** Filter by the name of the image repository */
repoName?: (Scalars['String'] | null)}

export interface ScImagesAffectedByCVEOrdering {
/** The field to order by (defaults to LAST_PUSHED) */
field?: (ScImagesAffectedByCVEOrderingField | null),
/** The sort order (defaults based on field) */
sortOrder?: (SortOrder | null)}

export interface ScImagesAffectedByCVEQuery {
/** The ID of the CVE */
cveId: Scalars['String'],
/** The name of the stream */
stream: Scalars['String'],
/** Specify the paging parameters for the query */
paging?: (PagingInput | null),
/** Specify any filtering for the query */
filter?: (ScImagesAffectedByCVEFilter | null),
/** Specify any ordering for the query */
ordering?: (ScImagesAffectedByCVEOrdering | null)}

export interface ScImagesAffectedByCVEResultGenqlSelection{
    /** Paging of the images */
    paging?: PagingGenqlSelection
    /** The images affected by the CVE */
    items?: ScImageAffectedByCVEGenqlSelection
    /** The total number of unique packages affected across the stream */
    packageCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScImageVulnerabilitiesByDigestGenqlSelection{
    digest?: boolean | number
    vulnerabilities?: VpPackageVulnerabilityGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScImageVulnerabilitiesByDigestQuery {
/**
 * TODO: This attribute is not yet implemented.
 * Include excepted vulnerabilities in the response (defaults to false)
 */
includeExcepted?: (Scalars['Boolean'] | null)}

export interface ScInformationRemediationGenqlSelection{
    id?: boolean | number
    acceptedBy?: boolean | number
    changesets?: ScRemediationChangesetGenqlSelection
    createdAt?: boolean | number
    details?: ScRemediationDetailGenqlSelection
    errors?: ScRemediationErrorGenqlSelection
    kind?: boolean | number
    score?: boolean | number
    state?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScLicencePolicyGenqlSelection{
    /** Name of the policy definition */
    definitionName?: boolean | number
    /** Name of the policy configuration */
    configurationName?: boolean | number
    /** Display name of the configured policy */
    displayName?: boolean | number
    /** Human-readable description of the configured policy */
    description?: boolean | number
    /** Whether policy has been evaluated */
    evaluated?: boolean | number
    /** The list of licenses that the configured policy checks for */
    licenses?: boolean | number
    /** The latest result of evaluating the policy */
    currentResult?: ScLicencePolicyResultGenqlSelection
    /** The latest delta for the policy, regardless of reason (the change in policy results since the specified timestamp) */
    latestDelta?: ScPolicyDeltaGenqlSelection
    /**
     * "
     * The available remediations for this policy result
     */
    remediations?: (ScRemediationGenqlSelection & { __args: {filter: ScRemediationFilter} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScLicencePolicyResultGenqlSelection{
    statusLabel?: boolean | number
    deviations?: ScPolicyResultLicenceDeviationGenqlSelection
    deviationCount?: boolean | number
    createdDateTime?: boolean | number
    /** If changes have been made to the policy that haven't been evaluated */
    isStale?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScOrganizationFilterGenqlSelection{
    name?: boolean | number
    values?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScOrganizationFilterInput {name: Scalars['String'],value: Scalars['String']}

export interface ScOrganizationStatusGenqlSelection{
    /** Whether the organization has any image analysis enabled */
    hasImageAnalysisEnabled?: boolean | number
    /** Whether the organization has any images which have been analyzed */
    hasAnalyzedImages?: boolean | number
    /** Whether the organization has ever had any images which have been analyzed */
    hasEverAnalyzedImages?: boolean | number
    /** The timestamp at which the last repository enablement change happened for the organization (in ISO8601 format) */
    lastRepoEnablementChangeAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPackageRangeGenqlSelection{
    /** Min number of packages across a set of images. */
    minCount?: boolean | number
    /** Max number of packages across a set of images. */
    maxCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPackageRootGenqlSelection{
    /** The name of the package */
    name?: boolean | number
    /** The type of the package */
    type?: boolean | number
    /** The namespace of the package */
    namespace?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPolicyDeltaGenqlSelection{
    deltaReason?: boolean | number
    deltaChange?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPolicyImageGenqlSelection{
    /** The digest of the image */
    digest?: boolean | number
    /** The tags associated with the image */
    tags?: IbTagGenqlSelection
    /** The repo associated with the image */
    repository?: ScPolicyRepoGenqlSelection
    /** The creation date of this image represented as an ISO8601 string. */
    createdAt?: boolean | number
    /** The platform of the image */
    platform?: IbImagePlatformGenqlSelection
    /** The results of policy evaluation for this image */
    policies?: BaseScPolicyGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPolicyInfoGenqlSelection{
    /** Name of the policy definition */
    definitionName?: boolean | number
    /** Name of the policy configuration */
    configurationName?: boolean | number
    /** Display name of the configured policy */
    displayName?: boolean | number
    /** Human-readable description of the configured policy */
    description?: boolean | number
    /** The type of deviations this policy tracks (vulnerabilities, licensed packages, boolean) */
    resultType?: boolean | number
    /** Who this policy is owned and configured by */
    owner?: boolean | number
    /** Is this policy currently enabled */
    enabled?: boolean | number
    /** Link to docs about remediating policy violations */
    remediationLink?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPolicyPackageLocationGenqlSelection{
    layerOrdinal?: boolean | number
    path?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPolicyRepoGenqlSelection{
    /** The host name of the repo */
    hostName?: boolean | number
    /** The name of the repo */
    repoName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPolicyResultGenericDeviationGenqlSelection{
    id?: boolean | number
    details?: ScPolicyResultGenericDeviationDetailGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPolicyResultGenericDeviationDetailGenqlSelection{
    key?: boolean | number
    value?: boolean | number
    displayName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPolicyResultLicenceDeviationGenqlSelection{
    id?: boolean | number
    purl?: boolean | number
    license?: boolean | number
    locations?: ScPolicyPackageLocationGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPolicyResultVulnerabilityDeviationGenqlSelection{
    id?: boolean | number
    vulnerability?: boolean | number
    purl?: boolean | number
    severity?: boolean | number
    cvssScore?: boolean | number
    fixedBy?: boolean | number
    locations?: ScPolicyPackageLocationGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPolicyStreamGenqlSelection{
    /** The latest image for this policy stream */
    latestImage?: ScPolicyImageGenqlSelection
    /** The policies of this stream */
    policies?: BaseScPolicyGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPolicyStreamResultGenqlSelection{
    /** The paging of the policy stream result */
    paging?: PagingGenqlSelection
    /** The matching results */
    items?: ScPolicyStreamGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPolicySummaryGenqlSelection{
    /** The policy that this summary is for */
    policy?: ScPolicyInfoGenqlSelection
    /** The stream that this summary is for */
    stream?: boolean | number
    /** The total number of images that have results for this policy */
    totalImages?: boolean | number
    /** The number of images that are compliant with this policy */
    compliantImages?: boolean | number
    /** The sum of all deviations for all images for this policy */
    totalDeviations?: boolean | number
    /** The number of images that have unknown compliance */
    unknownImages?: boolean | number
    /** The policy summary delta (the change in policy results since the specified timestamp) */
    delta?: ScPolicySummaryDeltaGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPolicySummaryDeltaGenqlSelection{
    /** The change in number of compliant images */
    compliantImages?: boolean | number
    /** The change in total number of deviations */
    totalDeviations?: boolean | number
    /** The change in total number of images */
    totalImages?: boolean | number
    /** The change in number of images that have unknown compliance */
    unknownImages?: boolean | number
    /** The point in time that the delta is calculated from */
    timestamp?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPolicySummaryResultGenqlSelection{
    /** The matching results */
    items?: ScPolicySummaryGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPullRequestRemediationGenqlSelection{
    id?: boolean | number
    acceptedBy?: boolean | number
    changesets?: ScRemediationChangesetGenqlSelection
    createdAt?: boolean | number
    details?: ScRemediationDetailGenqlSelection
    errors?: ScRemediationErrorGenqlSelection
    kind?: boolean | number
    score?: boolean | number
    state?: boolean | number
    updatedAt?: boolean | number
    pullRequest?: IbGitPullRequestGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPurlGenqlSelection{
    namespace?: boolean | number
    name?: boolean | number
    type?: boolean | number
    version?: boolean | number
    qualifiers?: boolean | number
    subpath?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScPurlInput {namespace?: (Scalars['String'] | null),name: Scalars['String'],type: Scalars['String'],version?: (Scalars['String'] | null),qualifiers?: (Scalars['String'] | null),subpath?: (Scalars['String'] | null)}

export interface ScRecentCVEGenqlSelection{
    cveId?: boolean | number
    highestSeverity?: boolean | number
    highestCVSSScore?: boolean | number
    detectedInCount?: boolean | number
    publishedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScRecentCVEsFilter {severities?: (CVSSSeverity[] | null)}

export interface ScRecentCVEsQuery {stream: Scalars['String'],filter?: (ScRecentCVEsFilter | null)}

export interface ScRecentCVEsResultGenqlSelection{
    items?: ScRecentCVEGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScRemediationGenqlSelection{
    id?: boolean | number
    acceptedBy?: boolean | number
    changesets?: ScRemediationChangesetGenqlSelection
    createdAt?: boolean | number
    details?: ScRemediationDetailGenqlSelection
    errors?: ScRemediationErrorGenqlSelection
    kind?: boolean | number
    score?: boolean | number
    state?: boolean | number
    updatedAt?: boolean | number
    on_ScInformationRemediation?: ScInformationRemediationGenqlSelection
    on_ScPullRequestRemediation?: ScPullRequestRemediationGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScRemediationChangesetGenqlSelection{
    id?: boolean | number
    message?: boolean | number
    patches?: ScRemediationChangesetPatchesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScRemediationChangesetPatchesGenqlSelection{
    file?: boolean | number
    patch?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScRemediationDetailGenqlSelection{
    key?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScRemediationErrorGenqlSelection{
    kind?: boolean | number
    details?: ScRemediationErrorDetailGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScRemediationErrorDetailGenqlSelection{
    key?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScRemediationFilter {
/**
 * Filter by remediation state.
 * If not set or `null`, then the data is returned unfiltered
 */
states?: (ScRemediationState[] | null)}

export interface ScRepositoryInput {hostName: Scalars['String'],repoName: Scalars['String']}

export interface ScRepositoryQuery {hostName: Scalars['String'],repoName: Scalars['String']}

export interface ScSinglePolicyResultGenqlSelection{
    /** The latest image for this policy stream */
    latestImage?: ScPolicyImageGenqlSelection
    /** The policy */
    policy?: BaseScPolicyGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScSinglePolicyResultsGenqlSelection{
    /** The paging of the policy result */
    paging?: PagingGenqlSelection
    /** The matching results */
    items?: ScSinglePolicyResultGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScStreamGenqlSelection{
    /** The name of the stream */
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScStreamBaseImagesSummaryFilter {
/** Filter by the name of the repository */
repoName?: (Scalars['String'] | null)}

export interface ScStreamBaseImagesSummaryOrdering {
/** The field to order by (defaults to CHILD_IMAGES_COUNT) */
field?: (ScStreamBaseImagesSummaryOrderingField | null),
/** The sort order (defaults based on field) */
sortOrder?: (SortOrder | null)}

export interface ScStreamBaseImagesSummaryQuery {
/** The stream we want to query for */
stream: Scalars['String'],
/** Specify the paging parameters for the query */
paging?: (PagingInput | null),
/** Specify any filtering for the query */
filter?: (ScStreamBaseImagesSummaryFilter | null),
/** Specify any ordering for the query */
ordering?: (ScStreamBaseImagesSummaryOrdering | null)}

export interface ScStreamBaseImagesSummaryResultGenqlSelection{
    /** Paging of the base images */
    paging?: PagingGenqlSelection
    /** The matching base images */
    items?: ScBaseImageSummaryGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScStreamCVEGenqlSelection{
    cveId?: boolean | number
    highestSeverity?: boolean | number
    highestCVSSScore?: boolean | number
    detectedInCount?: boolean | number
    fixable?: boolean | number
    packages?: StreamCVEPackageGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScStreamCVEsFilter {
/** Filter by the identity of the cve e.g. CVE-2021-44228 */
cveId?: (Scalars['String'] | null),
/** Filter by the highestSeverity of results e.g. HIGH */
severity?: (CVSSSeverity | null),
/** Filter results to only the supplied repos */
repos?: (ScRepositoryInput[] | null),
/** Filter by the highestSeverity of the results, allowing mulitple values */
severities?: (CVSSSeverity[] | null)}

export interface ScStreamCVEsOrdering {
/** The field to order by (defaults to SEVERITY) */
field?: (ScStreamCVEsOrderingField | null),
/** The sort order (defaults based on field) */
sortOrder?: (SortOrder | null)}

export interface ScStreamCVEsQuery {
/** The stream we want to query for */
stream: Scalars['String'],
/** Specify the paging parameters for the query */
paging?: (PagingInput | null),
/** Specify any filtering for the query */
filter?: (ScStreamCVEsFilter | null),
/** Specify any ordering for the query */
ordering?: (ScStreamCVEsOrdering | null),
/** Org-specific filters to apply */
orgFilters?: (ScOrganizationFilterInput[] | null)}

export interface ScStreamCVEsResultGenqlSelection{
    /** Paging of the base images */
    paging?: PagingGenqlSelection
    /** The matching base images */
    items?: ScStreamCVEGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScStreamGroupedPackagesQuery {
/** The stream we want to query for */
stream: Scalars['String'],
/** Specify the paging parameters for the query */
paging?: (PagingInput | null),
/** Used to reduce the set of packages returned by applying filters */
filter?: (ScGroupedPackagesFilter | null),
/** Used to determine the order of results returned */
ordering?: (ScGroupedPackagesOrdering | null)}

export interface ScStreamGroupedPackagesResultGenqlSelection{
    /** Paging of the packages */
    paging?: PagingGenqlSelection
    /** The matching packages */
    items?: ScGroupedPackageGenqlSelection
    /** The list of all available package types, ignoring any filters applied */
    packageTypes?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScStreamImagesByBaseImageFilter {
/** Filter by the name of the child image repository */
repoName?: (Scalars['String'] | null)}

export interface ScStreamImagesByBaseImageOrdering {
/** The field to order by (defaults to LAST_PUSHED) */
field?: (ScStreamImagesByBaseImageOrderingField | null),
/** The sort order (defaults based on field) */
sortOrder?: (SortOrder | null)}

export interface ScStreamImagesByBaseImageQuery {
/** The stream we want to query for */
stream: Scalars['String'],
/** The repository of the base images */
repository: ScRepositoryInput,
/** Specify the paging parameters for the query */
paging?: (PagingInput | null),
/** Specify any filtering for the query */
filter?: (ScStreamImagesByBaseImageFilter | null),
/** Specify any ordering for the query */
ordering?: (ScStreamImagesByBaseImageOrdering | null)}

export interface ScStreamImagesByBaseImageResultGenqlSelection{
    /** Paging of the base images */
    paging?: PagingGenqlSelection
    /** The matching images and their base image */
    items?: ImageWithBaseImageGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScStreamImagesFilter {
/** Filter by the name of the repository */
repoName?: (Scalars['String'] | null)}

export interface ScStreamImagesOrdering {
/** The field to order by (defaults to LAST_PUSHED) */
field?: (ScStreamImagesOrderingField | null),
/** The sort order (defaults based on field) */
sortOrder?: (SortOrder | null)}

export interface ScStreamImagesQuery {
/** The stream we want to query for */
stream: Scalars['String'],
/** Specify the paging parameters for the query */
paging?: (PagingInput | null),
/** Specify any filtering for the query */
filter?: (ScStreamImagesFilter | null),
/** Specify any ordering for the query */
ordering?: (ScStreamImagesOrdering | null),
/** Org-specific filters to apply */
orgFilters?: (ScOrganizationFilterInput[] | null)}

export interface ScStreamImagesResultGenqlSelection{
    /** Paging of the images */
    paging?: PagingGenqlSelection
    /** The matching images */
    items?: ImageWithBaseImageGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScStreamsQuery {
/** Specify the paging parameters for the query */
paging?: (PagingInput | null),
/** Specify any filtering for the query */
filter?: (ScStreamsQueryFilter | null)}


/** Filtering options for the streams query */
export interface ScStreamsQueryFilter {
/** Filter the streams down to those whose name matches the given prefix (case-sensitive) */
namePrefix?: (Scalars['String'] | null)}

export interface ScStreamsResultGenqlSelection{
    /** Paging of the streams */
    paging?: PagingGenqlSelection
    /** The matching streams */
    items?: ScStreamGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScTaggedImagesFilter {
/** Filter by the name of the tag */
tagName?: (Scalars['String'] | null)}

export interface ScTaggedImagesOrdering {
/** The field to order by (defaults to LAST_PUSHED) */
field?: (ScTaggedImagesOrderingField | null),
/** The sort order (defaults based on field) */
sortOrder?: (SortOrder | null)}

export interface ScTaggedImagesQuery {
/** The hostname of the Docker registry. Defaults to Docker Hub. */
hostName?: (Scalars['String'] | null),
/** The name of the Docker repository */
repoName: Scalars['String'],
/** Specify the paging parameters for the query */
paging?: (PagingInput | null),
/** Specify any filtering for the query */
filter?: (ScTaggedImagesFilter | null),
/** Specify any ordering for the query */
ordering?: (ScTaggedImagesOrdering | null)}

export interface ScTaggedImagesResultGenqlSelection{
    /** The hostname of the Docker registry */
    hostName?: boolean | number
    /** The name of the Docker repository */
    repoName?: boolean | number
    /** Paging of the images */
    paging?: PagingGenqlSelection
    /** The matching tags */
    tags?: ScTagWithDigestGenqlSelection
    /** The images associated to the different tags */
    images?: ImageWithBaseImageGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** This type represents a tag with the associated current digest */
export interface ScTagWithDigestGenqlSelection{
    /** The name of the tag. */
    name?: boolean | number
    /** The digest of the current image associated to this tag */
    digest?: boolean | number
    /** The last update date of this tag represented as an ISO8601 string. */
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScUserResultGenqlSelection{
    /** The id of the user */
    id?: boolean | number
    /** The email of the user */
    email?: boolean | number
    /** The name of the user */
    name?: boolean | number
    /** The username of the user */
    username?: boolean | number
    /** The avatar url of the user */
    avatarUrl?: boolean | number
    /** The organizations the user is part of */
    orgs?: DockerOrgGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVEXGenqlSelection{
    id?: boolean | number
    author?: boolean | number
    role?: boolean | number
    timestamp?: boolean | number
    version?: boolean | number
    statements?: ScVEXStatementGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVexDocumentGenqlSelection{
    id?: boolean | number
    documentUrl?: boolean | number
    timestamp?: boolean | number
    author?: boolean | number
    version?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVEXsQuery {
/** The repository we want to query for */
repoName: Scalars['String'],
/** The tag we want to query for */
tag?: (Scalars['String'] | null),
/** The digest we want to query for */
digest?: (Scalars['String'] | null),
/** The hostName we want to query for */
hostName?: (Scalars['String'] | null)}

export interface ScVEXsResultGenqlSelection{
    documents?: ScVEXGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVexStatementGenqlSelection{
    id?: boolean | number
    document?: ScVexDocumentGenqlSelection
    timestamp?: boolean | number
    cveId?: boolean | number
    status?: boolean | number
    justification?: boolean | number
    impactStatement?: boolean | number
    imageScopes?: ScVexStatementImageScopeGenqlSelection
    packageScopes?: ScVexStatementPackageScopeGenqlSelection
    errors?: ScVexStatementErrorGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVEXStatementGenqlSelection{
    sourceId?: boolean | number
    status?: boolean | number
    statusNotes?: boolean | number
    justification?: boolean | number
    actionStatement?: boolean | number
    impactStatement?: boolean | number
    products?: boolean | number
    subcomponents?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVexStatementErrorGenqlSelection{
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVexStatementImageScopeGenqlSelection{
    hostName?: boolean | number
    repoName?: boolean | number
    digest?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVexStatementImageScopeInput {hostName?: (Scalars['String'] | null),repoName?: (Scalars['String'] | null),digest?: (Scalars['String'] | null),packageScopes?: (ScVexStatementPackageScopeInput[] | null)}

export interface ScVexStatementPackageScopeGenqlSelection{
    namespace?: boolean | number
    name?: boolean | number
    purl?: boolean | number
    type?: boolean | number
    version?: boolean | number
    qualifiers?: boolean | number
    subpath?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVexStatementPackageScopeInput {purlFields: ScPurlInput}

export interface ScVexStatementsQuery {filter?: (ScVexStatementsQueryFilter | null),paging?: (PagingInput | null)}

export interface ScVexStatementsQueryFilter {stream?: (Scalars['String'] | null),
/** Substring match, not exact. Case insensitive. Eg. "cve-2019-1" matches "CVE-2019-1234" */
cveIdQuery?: (Scalars['String'] | null),digest?: (Scalars['String'] | null),status?: (ScVexStatementStatus | null),justification?: (ScVexStatementJustification | null),hasError?: (Scalars['Boolean'] | null)}

export interface ScVexStatementsQueryResultGenqlSelection{
    items?: ScVexStatementGenqlSelection
    itemsWithErrorsCount?: boolean | number
    paging?: PagingGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVulnerabilityExceptionGenqlSelection{
    id?: boolean | number
    author?: boolean | number
    timestamp?: boolean | number
    errors?: ScVulnerabilityExceptionErrorGenqlSelection
    vulnerability?: ScVulnerabilityExceptionVulnerabilityGenqlSelection
    type?: boolean | number
    /**
     * The image scopes of the vulnerability exception.
     * - null means "apply to all images in the org" of this exception.
     * - an empty array should be considered as an error.
     */
    imageScopes?: ScVulnerabilityExceptionImageScopeGenqlSelection
    reason?: ScVulnerabilityExceptionReasonGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVulnerabilityExceptionErrorGenqlSelection{
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVulnerabilityExceptionImageScopeGenqlSelection{
    hostName?: boolean | number
    repoName?: boolean | number
    digest?: boolean | number
    /** The package scopes of the vulnerability exception. null means "all packages in the image" */
    packageScopes?: ScVulnerabilityExceptionPackageScopeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVulnerabilityExceptionPackageScopeGenqlSelection{
    purl?: boolean | number
    purlFields?: ScPurlGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVulnerabilityExceptionReasonGenqlSelection{
    justification?: boolean | number
    additionalDetails?: boolean | number
    source?: BaseScVulnerabilityExceptionSourceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVulnerabilityExceptionScoutSourceGenqlSelection{
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVulnerabilityExceptionVEXSourceGenqlSelection{
    id?: boolean | number
    document?: ScVexDocumentGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVulnerabilityExceptionVulnerabilityGenqlSelection{
    cveId?: boolean | number
    highestSeverity?: boolean | number
    highestCVSSScore?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVulnerabilityPolicyGenqlSelection{
    /** Name of the policy definition */
    definitionName?: boolean | number
    /** Name of the policy configuration */
    configurationName?: boolean | number
    /** Display name of the configured policy */
    displayName?: boolean | number
    /** Human-readable description of the configured policy */
    description?: boolean | number
    /** Whether policy has been evaluated */
    evaluated?: boolean | number
    /** The latest result of evaluating the policy */
    currentResult?: ScVulnerabilityPolicyResultGenqlSelection
    /** The latest delta for the policy, regardless of reason (the change in policy results since the specified timestamp) */
    latestDelta?: ScPolicyDeltaGenqlSelection
    /** The available remediations for this policy result */
    remediations?: (ScRemediationGenqlSelection & { __args: {filter: ScRemediationFilter} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScVulnerabilityPolicyResultGenqlSelection{
    statusLabel?: boolean | number
    deviations?: ScPolicyResultVulnerabilityDeviationGenqlSelection
    deviationCount?: boolean | number
    createdDateTime?: boolean | number
    /** If changes have been made to the policy that haven't been evaluated */
    isStale?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A summary of vulnerability information about an image. */
export interface SdImageSummaryGenqlSelection{
    /** The image digest that we are returning the summary for */
    digest?: boolean | number
    /** The indexing state of the SBOM for the image whose report we are returning */
    sbomState?: boolean | number
    /**
     * A report on this image's vulnerabilities. Report will be null if the image
     * exists but no scan has occurred.
     */
    vulnerabilityReport?: VulnerabilityReportGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** The metadata of the matched secret. */
export interface SecretFindingGenqlSelection{
    /** The identifier for the rule which found the secret. */
    ruleId?: boolean | number
    /** The category of the secret, e.g. GitHub. */
    category?: boolean | number
    /** The title of the discovery. */
    title?: boolean | number
    /** The severity of the discovered secet */
    severity?: boolean | number
    /** The line or code where the secret was found, with the secret redacted. */
    match?: boolean | number
    /** The startLine of the matched secret. */
    startLine?: boolean | number
    /** The endLine of the matched secret. */
    endLine?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SetStreamImagesImage {image: Scalars['String'],appName: Scalars['String'],platform?: (ImagePlatform | null)}

export interface SetStreamImagesInput {stream: Scalars['String'],images: SetStreamImagesImage[]}

export interface SetStreamImagesResultGenqlSelection{
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StreamCVEPackageGenqlSelection{
    purl?: boolean | number
    severity?: boolean | number
    cvssScore?: boolean | number
    fixedBy?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Stream vulnerability reports response */
export interface StrVulnerabilityReportsGenqlSelection{
    /** The vulnerability reports over time */
    items?: TimestampedVulnerabilityReportGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Stream vulnerability reports query */
export interface StrVulnerabilityReportsQuery {
/** The stream to retrieve reports from */
stream: Scalars['String'],
/** How to summarize the vulnerabilities for the report (defaults to CUMULATIVE) */
summaryType?: (StrVulnerabilityReportsSummaryType | null),
/** The timescale over which to retrieve information (defaults to 7d) */
timescale?: (StrVulnerabilityReportsQueryTimescale | null)}


/** A vulnerability report from a specific timestamp */
export interface TimestampedVulnerabilityReportGenqlSelection{
    /** The timestamp at which the vulnerability report was taken (in ISO8601 format) */
    timestamp?: boolean | number
    /** A report of the vulnerability counts at the given time */
    vulnerabilityReport?: VulnerabilityReportGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** The repository we are returning recommendations for */
export interface TrDockerRepositoryGenqlSelection{
    /** The docker repository name */
    name?: boolean | number
    /** The number of times this repository has been docker pulled */
    pullCount?: boolean | number
    /** The number of times this repository has been starred */
    starCount?: boolean | number
    /** The docker repository description */
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** The Docker Tag information */
export interface TrDockerTagGenqlSelection{
    /** The image digest */
    digest?: boolean | number
    /** The index digest */
    indexDigest?: boolean | number
    /** When this tag was created */
    createdAt?: boolean | number
    /** The number of packages in this tag */
    packageCount?: boolean | number
    /** The image size */
    imageSize?: boolean | number
    /**
     * @deprecated No longer supported
     * The image size
     */
    size?: boolean | number
    /** The tags */
    tags?: boolean | number
    /** The aliases */
    aliases?: boolean | number
    /** The vulnerabilities associated with this tag */
    vulnerabilityReport?: VulnerabilityReportGenqlSelection
    /**
     * @deprecated No longer supported
     * The vulnerabilities associated with this tag
     */
    vulnerabilities?: VulnerabilityReportGenqlSelection
    /** The parsed tag data */
    tag?: TrTagDataGenqlSelection
    /** The scores for our recommendations */
    scoring?: TrScoringGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A tag recommendation */
export interface TrRecommendationsGenqlSelection{
    /** The current tag */
    currentTag?: TrDockerTagGenqlSelection
    /** The recommended tags */
    recommendedTags?: TrDockerTagGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Recommended tag response */
export interface TrRecommendedTagsGenqlSelection{
    /** The docker repository we are returning for */
    repository?: TrDockerRepositoryGenqlSelection
    /** The tag recommendations for this repository */
    recommendations?: TrRecommendationsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Tag scoring data */
export interface TrScoringGenqlSelection{
    /** Total score of the recommended tag */
    total?: boolean | number
    /** Summary of the tag recommendation */
    summary?: boolean | number
    /** Details of the scoring calculation */
    details?: TrScoringDetailsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Scoring criteria for recommendations */
export interface TrScoringDetailsGenqlSelection{
    /** The name of the scoring criteria */
    name?: boolean | number
    /** The Reason for the score */
    reason?: boolean | number
    /** The score */
    score?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Tag metadata */
export interface TrTagDataGenqlSelection{
    /** Name of the tag */
    name?: boolean | number
    /** os of the tag */
    os?: boolean | number
    /** framework of the tag */
    framework?: boolean | number
    /** runtime of the tag */
    runtime?: boolean | number
    /** flavour of the tag */
    flavor?: boolean | number
    /** is it slim? */
    slim?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** An individual tag recommendation for a digest */
export interface TrTagRecommendationResultGenqlSelection{
    /** The digest the result corresponds to */
    digest?: boolean | number
    /** The recommended tags for this digest or null if nothing could be found */
    recommendedTags?: TrRecommendedTagsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** The result of a tagRecommendationsByDigest query */
export interface TrTagRecommendationsByDigestsResultGenqlSelection{
    /** The tag recommendations for each digest requested */
    items?: TrTagRecommendationResultGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateVulnerabilityExceptionInput {id: Scalars['ID'],cveId?: (Scalars['String'] | null),type?: (ScVulnerabilityExceptionType | null),justification?: (ScVexStatementJustification | null),additionalDetails?: (Scalars['String'] | null),imageScopes?: (ScVexStatementImageScopeInput[] | null)}

export interface UpdateVulnerabilityExceptionResultGenqlSelection{
    exception?: ScVulnerabilityExceptionGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VpCVSSGenqlSelection{
    /** the CVSS severity of the vulnerability */
    severity?: boolean | number
    /** the CVSSVersion used to source the vulnerability data */
    version?: boolean | number
    /** the CVSS score of the vulnerability */
    score?: boolean | number
    /** the CVSS vector of the vulnerability */
    vector?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VpCWEGenqlSelection{
    /** The id of the CWE */
    cweId?: boolean | number
    /** A description of the CWE */
    description?: boolean | number
    /** The CWE http url */
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Contains the packageUrl that matched vulnerabilities and an array of vulnerabilites that matched */
export interface VpPackageVulnerabilityGenqlSelection{
    purl?: boolean | number
    vulnerabilities?: VpVulnerabilityGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Describes the vulnerability that the package is vulnerable to */
export interface VpVulnerabilityGenqlSelection{
    /** the source id or cve id of the vulnerability */
    sourceId?: boolean | number
    /** the source of the vulnerability data e.g. NIST, docker etc */
    source?: boolean | number
    /** a textual description of the vulnerability, can contain markdown depending on the source */
    description?: boolean | number
    /** a list of CWEs that the vulnerability contains */
    cwes?: VpCWEGenqlSelection
    /** the CVSS score object for this vulnerability */
    cvss?: VpCVSSGenqlSelection
    /** the version that this vulnerability is fixed by if available */
    fixedBy?: boolean | number
    /** the version range that this vulnerability applies to */
    vulnerableRange?: boolean | number
    /** an HTML link to more information on the vulnerability */
    url?: boolean | number
    /** The date/time when this vulnerability was first published */
    publishedAt?: boolean | number
    /** The date/time when this vulnerability was last updated */
    updatedAt?: boolean | number
    /** EPSS data for the vulnerability if present */
    epss?: EPSSGenqlSelection
    /** Is this vulnerability in the CISA list of known exploited vulnerabilities? */
    cisaExploited?: boolean | number
    /** Is this vulnerability excepted (suppressed) in the context of the queried image? */
    isExcepted?: boolean | number
    /** The details of the excepted vulnerability, only populated if isExcepted is true */
    vulnerabilityExceptions?: PkVulnerabilityExceptionGenqlSelection
    /**
     * The VEX statements that apply to the package, this differs to vulnerabilityExceptions in that it includes
     * VEX statements that are not exceptions, e.g. under_investigation, affected etc. 
     */
    vexStatements?: PkVexStatementGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** This type represents a vulnerability report about an image. */
export interface VulnerabilityReportGenqlSelection{
    /** The number of critical severity vulnerabilities present in the image. */
    critical?: boolean | number
    /** The number of high severity vulnerabilities present in the image. */
    high?: boolean | number
    /** The number of medium severity vulnerabilities present in the image. */
    medium?: boolean | number
    /** The number of low severity vulnerabilities present in the image. */
    low?: boolean | number
    /** The number of vulnerabilities with an unspecified severity present in the image. */
    unspecified?: boolean | number
    /** The total number of vulnerabilities present in the image. */
    total?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ArtifactoryAgentEntitlementGenqlSelection{
    enabled?: boolean | number
    /** If the feature is not enabled, what plan is required? */
    planRequirement?: PlanRequirementGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BlockedRepoResultGenqlSelection{
    hostName?: boolean | number
    namespace?: boolean | number
    repoName?: boolean | number
    blocked?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ConfigurablePolicyEntitlementGenqlSelection{
    enabled?: boolean | number
    /** If the feature is not enabled, what product tier is required? */
    planRequirement?: PlanRequirementGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DhiEntitlementGenqlSelection{
    /** Is dhi fully enabled for this namespace, either via a plan or a free trial */
    dhiEnabled?: boolean | number
    /** Can this namespace mirror more repos? */
    canMirrorMoreRepositories?: boolean | number
    /** Can this namespace view the dhi catalog? */
    canViewCatalog?: boolean | number
    /** The number of repos this namespace can mirror */
    repositoriesLimit?: boolean | number
    /** The number of repos this namespace has mirrored */
    mirroredRepositoriesCount?: boolean | number
    /** Is this namespace in a free trial? */
    freeTrial?: boolean | number
    /** The end date of the free trial if applicable */
    freeTrialEndDate?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DhiRepoFeatureGenqlSelection{
    isDhiRepo?: boolean | number
    /** The dhi mirrored repository, null if not a DHI repo. */
    dhiMirroredRepository?: EntitlementsDhiMirroredRepositoryGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EnabledRepositoriesResultGenqlSelection{
    repos?: RepositoryResultGenqlSelection
    count?: boolean | number
    entitlementUsed?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EntitlementsDhiMirroredRepositoryGenqlSelection{
    id?: boolean | number
    dhiSourceRepository?: EntitlementsDhiSourceRepositoryGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EntitlementsDhiSourceRepositoryGenqlSelection{
    name?: boolean | number
    namespace?: boolean | number
    displayName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FeatureEntitlementGenqlSelection{
    enabled?: boolean | number
    /** If the feature is not enabled, what product tier is required? */
    planRequirement?: PlanRequirementGenqlSelection
    on_ArtifactoryAgentEntitlement?: ArtifactoryAgentEntitlementGenqlSelection
    on_ConfigurablePolicyEntitlement?: ConfigurablePolicyEntitlementGenqlSelection
    on_LocalRepositoryEntitlement?: LocalRepositoryEntitlementGenqlSelection
    on_RemoteRepositoryEntitlement?: RemoteRepositoryEntitlementGenqlSelection
    on_VulnerabilityReportingEntitlement?: VulnerabilityReportingEntitlementGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FeatureEntitlementsGenqlSelection{
    artifactoryAgent?: ArtifactoryAgentEntitlementGenqlSelection
    configurablePolicy?: ConfigurablePolicyEntitlementGenqlSelection
    localRepository?: LocalRepositoryEntitlementGenqlSelection
    remoteRepository?: RemoteRepositoryEntitlementGenqlSelection
    scoutAPI?: ScoutAPIEntitlementGenqlSelection
    vulnerabilityReporting?: VulnerabilityReportingEntitlementGenqlSelection
    scoutEverywhere?: ScoutEverywhereEntitlementGenqlSelection
    dhi?: DhiEntitlementGenqlSelection
    enableOnPush?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IntegrationGenqlSelection{
    skill?: SkillGenqlSelection
    configurationName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IntegrationConfigurationFilter {skill: SkillInput,configurationName?: (Scalars['String'] | null)}

export interface IntegrationConfigurationInput {skill: SkillInput,configurationName: Scalars['String']}

export interface ListBlockedReposResultGenqlSelection{
    repos?: RepositoryResultGenqlSelection
    count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LocalRepositoryEntitlementGenqlSelection{
    enabled?: boolean | number
    /** If enabled and limit = nil, then unliminted */
    accountLimit?: boolean | number
    /** True if unlimited */
    isUnlimited?: boolean | number
    /**
     * @deprecated No longer supported
     * Currently not defined. Always nil
     */
    planLimit?: boolean | number
    /** If the feature is not enabled, what product tier is required? */
    planRequirement?: PlanRequirementGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MaintenanceGenqlSelection{
    severity?: boolean | number
    title?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MultiRepoVulnerabilityReportingInput {repoNames: Scalars['String'][],hostName?: (Scalars['String'] | null),enabled: Scalars['Boolean']}

export interface NamespaceEntitlementsGenqlSelection{
    namespace?: boolean | number
    plan?: ScEntitlementsPlanGenqlSelection
    isEnrolled?: boolean | number
    /** Null == Scout not enrolled */
    scoutEnrollment?: ScoutEnrollmentGenqlSelection
    featureEntitlements?: FeatureEntitlementsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PlanRequirementGenqlSelection{
    plan?: boolean | number
    tier?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductSubscriptionGenqlSelection{
    /** @deprecated No longer supported */
    tier?: boolean | number
    billingCycle?: boolean | number
    quantity?: ProductSubscriptionQuantityGenqlSelection
    renewalEnabled?: boolean | number
    renewalDate?: boolean | number
    endDate?: boolean | number
    status?: boolean | number
    graceDays?: boolean | number
    renewalAmount?: boolean | number
    totalAmount?: boolean | number
    origin?: boolean | number
    pendingChanges?: ProductSubscriptionPendingChangeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductSubscriptionPendingChangeGenqlSelection{
    type?: boolean | number
    date?: boolean | number
    tier?: boolean | number
    billingCycle?: boolean | number
    quantity?: ProductSubscriptionQuantityGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductSubscriptionQuantityGenqlSelection{
    value?: boolean | number
    unit?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RemoteRepositoryEntitlementGenqlSelection{
    enabled?: boolean | number
    /** If enabled and limit = nil, then unliminted */
    accountLimit?: boolean | number
    /** True if unlimited */
    isUnlimited?: boolean | number
    /**
     * @deprecated No longer supported
     * Currently not defined, always nil
     */
    planLimit?: boolean | number
    /** If the feature is not enabled, what product tier is required? */
    planRequirement?: PlanRequirementGenqlSelection
    /** Count of the number of repos currently enabled */
    enabledRepoCount?: boolean | number
    /** Count of the number of enabled repos which count towards their repository entitlement */
    entitlementUsed?: boolean | number
    /** Is this namespace exceeding their remote repository entitlement? */
    repoEntitlementExceeded?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ReposBlockedInput {hostName?: (Scalars['String'] | null),repoNames: Scalars['String'][],blocked: Scalars['Boolean']}

export interface RepositoryFeatureResultGenqlSelection{
    namespace?: boolean | number
    repoName?: boolean | number
    hostName?: boolean | number
    features?: RepositoryFeaturesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RepositoryFeaturesGenqlSelection{
    vulnerabilityReporting?: VulnerabilityReportingRepoFeatureGenqlSelection
    dhi?: DhiRepoFeatureGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RepositoryPropertiesGenqlSelection{
    preventDisable?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RepositoryResultGenqlSelection{
    hostName?: boolean | number
    repoName?: boolean | number
    integration?: IntegrationGenqlSelection
    type?: boolean | number
    properties?: RepositoryPropertiesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RepoVulnerabilityReportingInput {repoName: Scalars['String'],hostName?: (Scalars['String'] | null),enabled: Scalars['Boolean']}

export interface ScEntitlementsPlanGenqlSelection{
    displayName?: boolean | number
    isLegacy?: boolean | number
    isFree?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScoutAPIEntitlementGenqlSelection{
    /** Is scoutAPI enabled for this namespace */
    enabled?: boolean | number
    /** Is api access blocked due to the namespace exceeding repo limits? */
    accessRestrictedDueToRepoLimits?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScoutEnrollmentGenqlSelection{
    /** @deprecated No longer supported */
    plan?: boolean | number
    /** Refer to https://api.docker.team/api/billing_api#tag/products/paths/~1api~1billing~1v5~1accounts~1%7Baccount_name%7D~1products~1%7Bproduct_name%7D/get */
    activeSubscription?: ProductSubscriptionGenqlSelection
    /**
     * @deprecated No longer supported
     * Deprecated: use NamespaceEntitlements/featureEntitlements instead.
     */
    features?: ScoutEnrollmentFeaturesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScoutEnrollmentFeaturesGenqlSelection{
    repository?: ScoutEnrollmentFeaturesRepoGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScoutEnrollmentFeaturesRepoGenqlSelection{
    local?: boolean | number
    remote?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScoutEverywhereEntitlementGenqlSelection{
    /** Is scout everywhere scanning enabled on this namespace? */
    scanningEnabled?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ServiceStatusResultGenqlSelection{
    maintenance?: MaintenanceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SetEnableReposOnPushInput {enabled: Scalars['Boolean']}

export interface SetEnableReposOnPushResultGenqlSelection{
    /** Whether the organization is set to enable repos which aren't blocked on push, can only be used by organizations in the 'business' tier. */
    enabled?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ShouldEnableReposOnPushResultGenqlSelection{
    enabled?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SkillGenqlSelection{
    namespace?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SkillInput {namespace: Scalars['String'],name: Scalars['String']}

export interface VulnerabilityReportingEntitlementGenqlSelection{
    enabled?: boolean | number
    /** If enabled and limit = nil, then unliminted */
    accountLimit?: boolean | number
    /** If enabled and limit = nil, then unliminted */
    planLimit?: boolean | number
    /** If the feature is not enabled, what plan is required? */
    planRequirement?: PlanRequirementGenqlSelection
    /**
     * Deprecated: use accountLimit instead
     * If enabled and limit = negative, then unliminted
     */
    limit?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VulnerabilityReportingRepoFeatureGenqlSelection{
    enabled?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VulnerabilityReportingResultGenqlSelection{
    namespace?: boolean | number
    repoName?: boolean | number
    hostName?: boolean | number
    vulnerabilityReporting?: VulnerabilityReportingRepoFeatureGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MgAttestationGenqlSelection{
    digest?: boolean | number
    predicateType?: boolean | number
    reference?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MgAttestationBuildArgGenqlSelection{
    key?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MgAttestationBuildParametersGenqlSelection{
    args?: MgAttestationBuildArgGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MgAttestationDockerfileGenqlSelection{
    rawContent?: boolean | number
    sourceMap?: MgAttestationDockerfileSourceMapGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MgAttestationDockerfileSourceMapGenqlSelection{
    digests?: boolean | number
    endColumn?: boolean | number
    endLine?: boolean | number
    instruction?: boolean | number
    source?: boolean | number
    startColumn?: boolean | number
    startLine?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * This type represents the OCI Image Configuration for an image.
 * Documentation can be found here: https://github.com/opencontainers/image-spec/blob/main/config.md
 */
export interface MgAttestationOCIConfigGenqlSelection{
    config?: MgAttestationOCIConfigConfigGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MgAttestationOCIConfigConfigGenqlSelection{
    user?: boolean | number
    /**
     * The exposed ports for the image. This is represented here as a list of strings, but it is actually
     * a map in the format of `{ "80/tcp": {} }` in the oci image spec, where the value is always an empty 
     */
    exposedPorts?: boolean | number
    env?: boolean | number
    entrypoint?: boolean | number
    cmd?: boolean | number
    /**
     * The volumes for the image. This is represented here as a list of strings, but it is actually
     * a map in the format of `{ "/var/lib/something": {} }` in the oci image spec, where the value is always an empty 
     */
    volumes?: boolean | number
    workingDir?: boolean | number
    labels?: MgAttestationOCIConfigConfigLabelGenqlSelection
    stopSignal?: boolean | number
    argsEscaped?: boolean | number
    memory?: boolean | number
    memorySwap?: boolean | number
    cpuShares?: boolean | number
    healthcheck?: MgAttestationOCIConfigConfigHealthcheckGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MgAttestationOCIConfigConfigHealthcheckGenqlSelection{
    test?: boolean | number
    interval?: boolean | number
    timeout?: boolean | number
    retries?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MgAttestationOCIConfigConfigLabelGenqlSelection{
    key?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MgAttestationsListQuery {digest: Scalars['String'],hostName: Scalars['String'],repoName: Scalars['String']}

export interface MgAttestationsListResultGenqlSelection{
    /** Paging of the attestations */
    paging?: PagingGenqlSelection
    /** The image's attestations */
    items?: MgAttestationGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MgAttestationSourceGenqlSelection{
    commitUrl?: boolean | number
    commitSha?: boolean | number
    dockerfileUrl?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MgAttestationsQuery {digest: Scalars['String'],hostName: Scalars['String'],repoName: Scalars['String']}

export interface MgAttestationsResultGenqlSelection{
    buildParameters?: MgAttestationBuildParametersGenqlSelection
    dockerfile?: MgAttestationDockerfileGenqlSelection
    ociConfig?: MgAttestationOCIConfigGenqlSelection
    source?: MgAttestationSourceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BasePurlFieldsGenqlSelection{
    namespace?: boolean | number
    name?: boolean | number
    type?: boolean | number
    version?: boolean | number
    qualifiers?: boolean | number
    subpath?: boolean | number
    on_PurlFields?: PurlFieldsGenqlSelection
    on_VEXPackageScope?: VEXPackageScopeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CreateWebhookInput {payloadUrl: Scalars['String'],events: WebhookEvent[],signingKey?: (Scalars['String'] | null),active: Scalars['Boolean']}

export interface DeleteWebhookResultGenqlSelection{
    success?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DhiDestinationRepositoryGenqlSelection{
    name?: boolean | number
    namespace?: boolean | number
    hostname?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DhiDestinationRepositoryFilter {hostname: Scalars['String'],namespace: Scalars['String'],name: Scalars['String']}

export interface DhiDestinationRepositoryInput {name: Scalars['String'],namespace: Scalars['String']}

export interface DhiGetMirroredRepositoriesBySourceRepositoryQuery {dhiSourceRepository: DhiSourceRepositoryInput}

export interface DhiGetMirroredRepositoriesBySourceRepositoryResponseGenqlSelection{
    /** The list of mirrored repositories */
    mirroredRepositories?: DhiMirroredRepositoryGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DhiGetMirroredRepositoryQuery {mirroredRepositoryId: Scalars['String']}

export interface DhiGetMirroredRepositoryResponseGenqlSelection{
    /** The mirrored repository, null if it doesn't exist */
    mirroredRepository?: DhiMirroredRepositoryGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Details for a DHI image manifest */
export interface DhiImageManifestGenqlSelection{
    manifestDigest?: boolean | number
    platform?: boolean | number
    distribution?: boolean | number
    compressedSize?: boolean | number
    packageManager?: boolean | number
    shell?: boolean | number
    user?: boolean | number
    workingDirectory?: boolean | number
    fipsCompliant?: boolean | number
    stigCertified?: boolean | number
    lastPushed?: boolean | number
    vulnerabilities?: VulnerabilityReportGenqlSelection
    scoutHealthScore?: ScoutHealthScoreGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DhiImageTagGenqlSelection{
    name?: boolean | number
    lastUpdated?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * An index digest for a DHI image. Contains an aggregate of all the tags
 * that apply to this image. Also contains all the manifests that make up this
 * index.
 */
export interface DhiIndexImageGenqlSelection{
    indexDigest?: boolean | number
    tags?: DhiImageTagGenqlSelection
    imageManifests?: DhiImageManifestGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DhiListMirroredRepositoriesResponseGenqlSelection{
    /** The list of mirrored repositories */
    mirroredRepositories?: DhiMirroredRepositoryGenqlSelection
    /** The total number of mirrored repositories */
    totalCount?: boolean | number
    /** Whether the organization can mirror more repositories */
    canMirrorMoreRepositories?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DhiListMirroringLogsPagingInput {pageSize?: (Scalars['Int'] | null),page?: (Scalars['Int'] | null)}

export interface DhiListMirroringLogsQuery {destinationRepositories?: (DhiDestinationRepositoryFilter[] | null),includedStatuses?: (DhiMirroringLogStatus[] | null),excludedStatuses?: (DhiMirroringLogStatus[] | null),triggeredSince?: (Scalars['String'] | null),paging?: (DhiListMirroringLogsPagingInput | null)}

export interface DhiListMirroringLogsResultGenqlSelection{
    items?: DhiMirroringLogGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DhiMirroredRepositoryGenqlSelection{
    id?: boolean | number
    destinationRepository?: DhiDestinationRepositoryGenqlSelection
    dhiSourceRepository?: DhiSourceRepositoryGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DhiMirroringLogGenqlSelection{
    id?: boolean | number
    reason?: boolean | number
    status?: boolean | number
    sourceRepository?: DhiSourceRepositoryGenqlSelection
    destinationRepository?: DhiDestinationRepositoryGenqlSelection
    tag?: boolean | number
    digest?: boolean | number
    triggeredAt?: boolean | number
    pushedAt?: boolean | number
    startedAt?: boolean | number
    completedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DhiRemoveMirroredRepositoryInput {mirroredRepositoryId: Scalars['String']}

export interface DhiRepositoriesQuery {filter?: (DhiRepositoriesQueryFilter | null)}

export interface DhiRepositoriesQueryFilter {
/** Filter results to just this category by id */
categoryId?: (Scalars['String'] | null)}


/** The result of a query for a DHI repositories */
export interface DhiRepositoriesResultGenqlSelection{
    items?: DhiRepositorySummaryGenqlSelection
    /** All the categories for the repositories, ignoring filters */
    categories?: DhiRepositoryCategoryGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A category for a DHI repository */
export interface DhiRepositoryCategoryGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DhiRepositoryDetailsQuery {repoName: Scalars['String']}


/**
 * Details for a DHI repository, used on the repo page. Contains all the information for the
 * various tabs on that page. e.g. the digest/tag lists
 */
export interface DhiRepositoryDetailsResultGenqlSelection{
    name?: boolean | number
    namespace?: boolean | number
    displayName?: boolean | number
    shortDescription?: boolean | number
    featured?: boolean | number
    fipsCompliant?: boolean | number
    stigCertified?: boolean | number
    homeUrl?: boolean | number
    categories?: DhiRepositoryCategoryGenqlSelection
    distributions?: boolean | number
    platforms?: boolean | number
    overview?: boolean | number
    guides?: boolean | number
    images?: DhiIndexImageGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A summary of a DHI repository */
export interface DhiRepositorySummaryGenqlSelection{
    name?: boolean | number
    namespace?: boolean | number
    displayName?: boolean | number
    shortDescription?: boolean | number
    featured?: boolean | number
    fipsCompliant?: boolean | number
    stigCertified?: boolean | number
    homeUrl?: boolean | number
    categories?: DhiRepositoryCategoryGenqlSelection
    distributions?: boolean | number
    platforms?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DhiSetMirroredRepositoryInput {dhiSourceRepository: DhiSourceRepositoryInput,destinationRepository: DhiDestinationRepositoryInput}

export interface DhiSetMirroredRepositoryResponseGenqlSelection{
    /** The mirrored repository, null if it doesn't exist */
    mirroredRepository?: DhiMirroredRepositoryGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DhiSourceRepositoryGenqlSelection{
    name?: boolean | number
    namespace?: boolean | number
    hostname?: boolean | number
    displayName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DhiSourceRepositoryInput {name: Scalars['String'],namespace: Scalars['String']}

export interface DhiTagDetailsQuery {repoName: Scalars['String'],tag: Scalars['String']}


/** The result of a query for a DHI tag details */
export interface DhiTagDetailsResultGenqlSelection{
    indexDigest?: boolean | number
    repo?: boolean | number
    tag?: DhiImageTagGenqlSelection
    allTags?: DhiImageTagGenqlSelection
    imageManifests?: DhiImageManifestGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ExceptionSourceGenqlSelection{
    on_VEXStatement?:VEXStatementGenqlSelection,
    on_ManualException?:ManualExceptionGenqlSelection,
    __typename?: boolean | number
}

export interface ExceptionVulnerabilityGenqlSelection{
    cveId?: boolean | number
    highestSeverity?: boolean | number
    highestCVSSScore?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FullImageCoordInput {digest: Scalars['String'],hostname: Scalars['String'],repository: Scalars['String']}

export interface ImageCoordInput {digest: Scalars['String'],hostname?: (Scalars['String'] | null),repository?: (Scalars['String'] | null)}

export interface ImageRepositoryResultGenqlSelection{
    hostname?: boolean | number
    repository?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ImagesWithPackageOrdering {field?: (ImagesWithPackageOrderingField | null),sortOrder?: (SortOrder | null)}

export interface ListWebhooksResultGenqlSelection{
    items?: WebhookGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ManualExceptionGenqlSelection{
    exceptionId?: boolean | number
    type?: boolean | number
    author?: boolean | number
    created?: boolean | number
    cveId?: boolean | number
    scopes?: VEXStatementScopeGenqlSelection
    /** Present only when type is FALSE_POSITIVE */
    justification?: boolean | number
    additionalDetails?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationResponseGenqlSelection{
    status?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PkImagePlatformGenqlSelection{
    /** The OS (Operating System) of the image, eg. linux */
    os?: boolean | number
    /** The chip architecture of the image, eg. arm64 */
    architecture?: boolean | number
    /** The OS variant of the image */
    variant?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PkImagesWithPackageFilter {packageVersion?: (Scalars['String'] | null),repoName?: (Scalars['String'] | null),kvs?: (KVFilterInput[] | null)}

export interface PkImagesWithPackageQuery {name: Scalars['String'],type: Scalars['String'],namespace?: (Scalars['String'] | null),stream: Scalars['String'],paging?: (PagingInput | null),filter?: (PkImagesWithPackageFilter | null),ordering?: (ImagesWithPackageOrdering | null)}

export interface PkImagesWithPackageResponseGenqlSelection{
    items?: PkImageWithPackageGenqlSelection
    paging?: PagingGenqlSelection
    versions?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PkImageWithPackageGenqlSelection{
    repository?: PkRepositoryGenqlSelection
    digest?: boolean | number
    name?: boolean | number
    lastPushed?: boolean | number
    packageVersions?: boolean | number
    platform?: PkImagePlatformGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PkRepositoryGenqlSelection{
    hostName?: boolean | number
    repoName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PkRepositoryInput {
/** e.g. hub.docker.com */
hostName: Scalars['String'],
/** e.g. your-org/your-repo */
repoName: Scalars['String']}

export interface PkStreamSummaryFilter {
/** Filter the results to only include the supplied repos */
repos?: (PkRepositoryInput[] | null)}

export interface PurlFieldsGenqlSelection{
    namespace?: boolean | number
    name?: boolean | number
    type?: boolean | number
    version?: boolean | number
    qualifiers?: boolean | number
    subpath?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScCVEPackageVulnerabilityGenqlSelection{
    /** The name of the package */
    name?: boolean | number
    /** The type of the package */
    type?: boolean | number
    /** The namespace of the package */
    namespace?: boolean | number
    /** The name of the operating system if applicable */
    osName?: boolean | number
    /** The version of the operating system if applicable */
    osVersion?: boolean | number
    /** The version ranges of this vulnerability */
    versions?: ScCVEPackageVulnerabilityVersionGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScCVEPackageVulnerabilityVersionGenqlSelection{
    /** The vulnerable version range of this package */
    vulnerableRange?: boolean | number
    /** The version of this package that fixes the vulnerability (if applicable) */
    fixedBy?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScCVESourceGenqlSelection{
    /** The name/id of the source */
    source?: boolean | number
    /** The formatted name of the source */
    sourceName?: boolean | number
    /** The id of the cve at the source */
    sourceId?: boolean | number
    /** The url of the cve at the sources database */
    url?: boolean | number
    /** Description of the cve from this source */
    description?: boolean | number
    /** When this cve was created for this source */
    createdAt?: boolean | number
    /** When this cve was last updated for this source */
    updatedAt?: boolean | number
    /** When this source withdrew the cve (if applicable) */
    withdrawnAt?: boolean | number
    /** The state of this cve (e.g. disputed). */
    state?: boolean | number
    /** How exploitable is this cve */
    exploitabilityScore?: boolean | number
    /** The severity, score and cvss for this cve */
    cvss?: VpCVSSGenqlSelection
    /** The packages from this source that are vulnerable to the cve */
    packages?: ScCVEPackageVulnerabilityGenqlSelection
    /** The CWEs that apply to this source of the cve */
    cwes?: VpCWEGenqlSelection
    /** A list of exploit urls */
    exploits?: boolean | number
    /** A list of advisory urls */
    advisories?: boolean | number
    /** A list of patch urls */
    patches?: boolean | number
    /** A list of commit urls */
    commits?: boolean | number
    /** A list of info urls */
    info?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScCVESourcesQuery {cveId: Scalars['String']}

export interface ScCVESourcesResultGenqlSelection{
    /** The id of the cve we are returning sources for */
    cveId?: boolean | number
    /** The default source for this cve */
    defaultSource?: boolean | number
    /** A list of all sources of information for this cve */
    sources?: ScCVESourceGenqlSelection
    /** The EPSS data for the cve if available */
    epss?: EPSSGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** The health score for the image */
export interface ScoutHealthScoreGenqlSelection{
    score?: boolean | number
    policies?: ScoutHealthScorePolicyGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A health score policy for an image */
export interface ScoutHealthScorePolicyGenqlSelection{
    name?: boolean | number
    label?: boolean | number
    status?: boolean | number
    description?: boolean | number
    violationCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StreamSummaryQuery {
/** The mode we use to sum the vulnerabilies - see StreamSummaryMode for detaisl */
summaryMode: StreamSummaryMode,
/** The stream we are querying */
stream: Scalars['String'],
/** Filter the results */
filter?: (PkStreamSummaryFilter | null)}

export interface StreamSummaryResultGenqlSelection{
    vulnerabilityReport?: VulnerabilityReportGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TestWebhookResultGenqlSelection{
    success?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateWebhookInput {id: Scalars['String'],payloadUrl: Scalars['String'],events: WebhookEvent[],signingKey?: (Scalars['String'] | null),active: Scalars['Boolean']}

export interface VEXDocumentGenqlSelection{
    documentId?: boolean | number
    documentUrl?: boolean | number
    timestamp?: boolean | number
    author?: boolean | number
    version?: boolean | number
    source?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VEXPackageScopeGenqlSelection{
    purl?: boolean | number
    type?: boolean | number
    namespace?: boolean | number
    name?: boolean | number
    qualifiers?: boolean | number
    version?: boolean | number
    subpath?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VEXStatementGenqlSelection{
    statementId?: boolean | number
    timestamp?: boolean | number
    document?: VEXDocumentGenqlSelection
    cveId?: boolean | number
    scopes?: VEXStatementScopeGenqlSelection
    status?: boolean | number
    justification?: boolean | number
    statusStatement?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VEXStatementImageGenqlSelection{
    digest?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VEXStatementScopeGenqlSelection{
    repository?: ImageRepositoryResultGenqlSelection
    image?: VEXStatementImageGenqlSelection
    packages?: VEXPackageScopeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VulnerabilitiesByPackageQuery {packageUrls: Scalars['String'][],imageCoords: ImageCoordInput,includeExcepted?: (Scalars['Boolean'] | null)}

export interface VulnerabilitiesByPackageResponseGenqlSelection{
    items?: VpPackageVulnerabilityGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** An Exception, backed by either a manual exeption or a VEX statement */
export interface VulnerabilityExceptionGenqlSelection{
    id?: boolean | number
    author?: boolean | number
    timestamp?: boolean | number
    vulnerability?: ExceptionVulnerabilityGenqlSelection
    type?: boolean | number
    imageScopes?: VulnerabilityExceptionImageScopeGenqlSelection
    reason?: VulnerabilityExceptionReasonGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VulnerabilityExceptionImageScopeGenqlSelection{
    hostName?: boolean | number
    repoName?: boolean | number
    digest?: boolean | number
    /** The package scopes of the vulnerability exception. null means "all packages in the image" */
    packageScopes?: VulnerabilityExceptionPackageScopeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VulnerabilityExceptionPackageScopeGenqlSelection{
    purl?: boolean | number
    purlFields?: PurlFieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VulnerabilityExceptionReasonGenqlSelection{
    justification?: boolean | number
    additionalDetails?: boolean | number
    source?: ExceptionSourceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VulnerabilityExceptionsApplicableToImageQuery {image: FullImageCoordInput,filter?: (VulnerabilityExceptionsApplicableToImageQueryFilter | null),paging: PagingInput}

export interface VulnerabilityExceptionsApplicableToImageQueryFilter {orgExceptionsOnly?: (Scalars['Boolean'] | null),
/** Case insensitive. Eg. "cve-2019-1" matches "CVE-2019-1234". */
cveIdPrefix?: (Scalars['String'] | null),type?: (ExceptionType | null),justification?: (VEXStatementJustification | null),sourceType?: (SourceType | null)}

export interface VulnerabilityExceptionsQuery {filter?: (VulnerabilityExceptionsQueryFilter | null),paging: PagingInput}

export interface VulnerabilityExceptionsQueryFilter {hostname?: (Scalars['String'] | null),repository?: (Scalars['String'] | null),digest?: (Scalars['String'] | null),orgExceptionsOnly?: (Scalars['Boolean'] | null),
/** The exact CVE ID to filter vulnerability exceptions, e.g. "CVE-2019-1234" */
cveId?: (Scalars['String'] | null),
/** Include this field only if the 'cveId' field is not specified, as they are mutually exclusive. Case insensitive. Eg. "cve-2019-1" matches "CVE-2019-1234". */
cveIdPrefix?: (Scalars['String'] | null),type?: (ExceptionType | null),justification?: (VEXStatementJustification | null),sourceType?: (SourceType | null)}

export interface VulnerabilityExceptionsResultGenqlSelection{
    items?: VulnerabilityExceptionGenqlSelection
    paging?: PagingGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WebhookGenqlSelection{
    id?: boolean | number
    payloadUrl?: boolean | number
    events?: boolean | number
    signingKey?: boolean | number
    active?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AddNotificationWebhookInput {
/** ID of the configuration. If not provided, one will be autogenerated. */
ID?: (Scalars['String'] | null),
/** Name of the notification. Required for adding new configurations. */
name: Scalars['String'],
/** Type of webhook. Required for adding new configurations. */
webhookType: WebhookType,
/** Webhook URL. Required for adding new configurations. */
url: Scalars['String'],
/** List of repositories to consider in the filter. */
repositories?: ((Scalars['String'] | null)[] | null),
/**
 * Type of filter to apply to the repositories:
 * - Allow: Will send notifications just for the listed repositories.
 * - Block: Will send notifications for the repositories not listed.
 * 
 * Default: Allow
 */
filterType?: (RepositoryFilterType | null),
/** Weekly report settings. If not provided, the defaults will be applied. */
weeklyReportSettings?: (WeeklyReportSettingsInput | null),
/** List of streams to filter the notifications. If not provided, latest-indexed will be used. */
streams?: ((Scalars['String'] | null)[] | null)}

export interface CVEVulnerabilityStateGenqlSelection{
    /** CVSS Score of the vulnerability */
    CVSSScore?: boolean | number
    /** CVE Severity */
    severity?: boolean | number
    /** Whether this CVE has a fix */
    fixable?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FeedNotificationGenqlSelection{
    on_NotificationNewCVE?:NotificationNewCVEGenqlSelection,
    on_NotificationUpdateCVE?:NotificationUpdateCVEGenqlSelection,
    __typename?: boolean | number
}

export interface GenericWebhookGenqlSelection{
    /** ID of the configuration. */
    ID?: boolean | number
    /** Name of the webhook configuration. */
    name?: boolean | number
    /** Author of the webhook configuration. */
    author?: NotificationWebhookAuthorGenqlSelection
    /** When it was last updated, in RFC3339. */
    updatedAt?: boolean | number
    /** Webhook URL. As this is considered a secret, when set, the value will be redacted. */
    url?: boolean | number
    /** List of repositories to consider in the filter. */
    repositories?: boolean | number
    /**
     * Type of filter to apply to the repositories:
     * - Allow: Will send notifications just for the listed repositories.
     * - Block: Will send notifications for the repositories not listed.
     */
    filterType?: boolean | number
    /** List of streams to filter the notifications. If empty, latest-indexed will be used. */
    streams?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ImageReferenceGenqlSelection{
    /** Repository of the image */
    repository?: boolean | number
    /** Package impacted by the CVE */
    impactedPackage?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NotificationGenqlSelection{
    id?: boolean | number
    organization?: boolean | number
    title?: boolean | number
    body?: boolean | number
    url?: boolean | number
    isRead?: boolean | number
    isDismissed?: boolean | number
    createdAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NotificationNewCVEGenqlSelection{
    /** Event name. `new_cve` */
    event?: boolean | number
    /** Organization */
    organization?: boolean | number
    /** CVE that triggered the notification */
    cve?: boolean | number
    /** Vulnerability state of the CVE */
    afterState?: CVEVulnerabilityStateGenqlSelection
    /** Number of images impacted in this event */
    numImpactedImages?: boolean | number
    /** Some images impacted by this event */
    sampleImages?: ImageReferenceGenqlSelection
    /** Created at in RFC3339 */
    createdAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NotificationUpdateCVEGenqlSelection{
    /** Event name. `update_cve` */
    event?: boolean | number
    /** Organization */
    organization?: boolean | number
    /** CVE that triggered the notification */
    cve?: boolean | number
    /** Vulnerability state of before this CVE event */
    beforeState?: CVEVulnerabilityStateGenqlSelection
    /** Vulnerability state of the CVE after this event */
    afterState?: CVEVulnerabilityStateGenqlSelection
    /** Number of images impacted in this event */
    numImpactedImages?: boolean | number
    /** Some images impacted by this event */
    sampleImages?: ImageReferenceGenqlSelection
    /** Created at in RFC3339 */
    createdAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NotificationUpdateInput {isRead?: (Scalars['Boolean'] | null),isDismissed?: (Scalars['Boolean'] | null)}

export interface NotificationWebhookAuthorGenqlSelection{
    /** Name of the author. */
    name?: boolean | number
    /** Email of the author. */
    email?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NotificationWebhookFilterInput {
/** Type of webhook. */
webhookType?: (WebhookType | null)}

export interface NotificationWebhookResultGenqlSelection{
    /** ID of the configuration. */
    ID?: boolean | number
    /** Name of the webhook configuration. */
    name?: boolean | number
    /** Author of the webhook configuration. */
    author?: NotificationWebhookAuthorGenqlSelection
    /** When it was last updated, in RFC3339. */
    updatedAt?: boolean | number
    /** Webhook URL. As this is considered a secret, when set, the value will be redacted. */
    url?: boolean | number
    /** List of repositories to consider in the filter. */
    repositories?: boolean | number
    /**
     * Type of filter to apply to the repositories:
     * - Allow: Will send notifications just for the listed repositories.
     * - Block: Will send notifications for the repositories not listed.
     */
    filterType?: boolean | number
    /** List of streams to filter the notifications. If empty, latest-indexed will be used. */
    streams?: boolean | number
    on_GenericWebhook?: GenericWebhookGenqlSelection
    on_SlackWebhook?: SlackWebhookGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RepositoryGenqlSelection{
    hostName?: boolean | number
    repositoryName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RepositoryInput {hostName: Scalars['String'],repositoryName: Scalars['String']}

export interface SlackWebhookGenqlSelection{
    /** ID of the configuration. */
    ID?: boolean | number
    /** Name of the webhook configuration. */
    name?: boolean | number
    /** Author of the webhook configuration. */
    author?: NotificationWebhookAuthorGenqlSelection
    /** When it was last updated, in RFC3339. */
    updatedAt?: boolean | number
    /** Webhook URL. As this is considered a secret, when set, the value will be redacted. */
    url?: boolean | number
    /** List of repositories to consider in the filter. */
    repositories?: boolean | number
    /**
     * Type of filter to apply to the repositories:
     * - Allow: Will send notifications just for the listed repositories.
     * - Block: Will send notifications for the repositories not listed.
     */
    filterType?: boolean | number
    /**
     * @deprecated Use `weeklyReportSettings`.
     * DEPRECATED: Use weeklyReportSettings instead
     * Send weekly reports (only applies to Slack Webhook Type)
     */
    weeklyReportEnabled?: boolean | number
    /** Weekly report settings */
    weeklyReportSettings?: WeeklyReportSettingsGenqlSelection
    /** List of streams to filter the notifications. If empty, latest-indexed will be used. */
    streams?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TeamInput {
/** If provided, the feed will be filtered by Hub team */
team: Scalars['String']}

export interface UpdateNotificationWebhookInput {
/** ID of the configuration. */
ID: Scalars['String'],
/** Name of the notification. */
name?: (Scalars['String'] | null),
/** Type of webhook. */
webhookType?: (WebhookType | null),
/** Webhook URL. */
url?: (Scalars['String'] | null),
/** List of repositories to consider in the filter. */
repositories?: ((Scalars['String'] | null)[] | null),
/**
 * Type of filter to apply to the repositories:
 * - Allow: Will send notifications just for the listed repositories.
 * - Block: Will send notifications for the repositories not listed.
 * 
 * Default: Allow
 */
filterType?: (RepositoryFilterType | null),
/** Weekly report settings. */
weeklyReportSettings?: (WeeklyReportSettingsInput | null),
/** List of streams to filter the notifications. If not provided, latest-indexed will be used. */
streams?: ((Scalars['String'] | null)[] | null)}

export interface UserNotificationPreferencesInput {
/** If true, the user will receive notifications for all repositories they have access to. */
allRepositories?: (Scalars['Boolean'] | null),
/**
 * List of repositories the user wants to receive notifications for.
 * If allRepositories is true, this field is ignored.
 */
repositories?: (RepositoryInput[] | null)}

export interface UserNotificationPreferencesResultGenqlSelection{
    /** If true, the user will receive notifications for all repositories they have access to. */
    allRepositories?: boolean | number
    /** List of repositories the user wants to receive notifications for is allRepositories is false. */
    repositories?: RepositoryGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WeeklyReportSettingsGenqlSelection{
    /** Send weekly reports. */
    enabled?: boolean | number
    /** Exclude top fixable vulnerabilities section from the report. */
    excludeTopVulnerabilities?: boolean | number
    /** Exclude policy section from the report. */
    excludePolicies?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WeeklyReportSettingsInput {
/**
 * Send weekly reports.
 * 
 * Default: true
 */
enabled?: (Scalars['Boolean'] | null),
/**
 * Exclude top fixable vulnerabilities section from the report.
 * 
 * Default: false
 */
excludeTopVulnerabilities?: (Scalars['Boolean'] | null),
/**
 * Exclude policy section from the report.
 * 
 * Default: false
 */
excludePolicies?: (Scalars['Boolean'] | null)}

export interface rsAcrResultGenqlSelection{
    /** Total count of repositories. */
    repositoryCount?: boolean | number
    /** Registry hostname of the registry. */
    hostName?: boolean | number
    /** Registry status. */
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface rsDockerHubResultGenqlSelection{
    /** Total count of repositories. */
    repositoryCount?: boolean | number
    /** Registry hostname of the registry. */
    hostName?: boolean | number
    /** Registry status. */
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface rsEcrResultGenqlSelection{
    /** Total count of repositories. */
    repositoryCount?: boolean | number
    /** Registry hostname of the registry. */
    hostName?: boolean | number
    /** Registry status. */
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface rsPageInfoGenqlSelection{
    /** Current page number. Starts at 1. */
    page?: boolean | number
    /** Total number of pages. */
    total?: boolean | number
    /** Number of items per page. */
    pageSize?: boolean | number
    /** Next page number. Null if the current page is the last one. */
    nextPage?: boolean | number
    /** Previous page number. Null if the current page is the first one. */
    previousPage?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface rsRegistryResultGenqlSelection{
    /** Total count of repositories. */
    repositoryCount?: boolean | number
    /** Registry hostname of the registry. */
    hostName?: boolean | number
    /** Registry status. */
    status?: boolean | number
    on_rsAcrResult?: rsAcrResultGenqlSelection
    on_rsDockerHubResult?: rsDockerHubResultGenqlSelection
    on_rsEcrResult?: rsEcrResultGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface rsRepositoryGenqlSelection{
    /** Full name of the repository, including any namespace. */
    name?: boolean | number
    /** Registry hostname of the repository. */
    registry?: boolean | number
    /** Description of the repository. */
    description?: boolean | number
    /** Date of creation of the repository. */
    createdAt?: boolean | number
    /** Date of latest update of the repository. */
    updatedAt?: boolean | number
    /** Indicate if the repository contains images or not. */
    isEmpty?: boolean | number
    /** Indicate if the repository is enabled or not on Docker Scout. */
    enabled?: boolean | number
    /** Indicate the type of repository */
    type?: boolean | number
    /** Properties associated with this repository */
    properties?: rsRepositoryPropertiesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface rsRepositoryListFilter {
/** Filter on repository name. */
repository?: (Scalars['String'] | null)}


/** End of shared types. */
export interface rsRepositoryListInput {
/**
 * Optional: if not provided, Docker Hub registry will be used.
 * 
 * The skill configuration to select the right registry.
 */
skill?: (rsSkillInput | null),
/** Filter on repository name. */
filter?: (rsRepositoryListFilter | null),
/**
 * Order of the repositories.
 * If none provided, the default order is by repository name asc.
 */
ordering?: (rsRepositoryOrdering | null),
/** Page info */
page?: (PagingInput | null)}

export interface rsRepositoryListResultGenqlSelection{
    /** Total count of repositories. */
    count?: boolean | number
    /** Information about the page. */
    pageInfo?: rsPageInfoGenqlSelection
    /** Registry hostname of the repositories (if at least one repository). */
    registry?: boolean | number
    /** The skill configuration to select the right registry. */
    skill?: rsSkillGenqlSelection
    /** List of repositories. */
    repositories?: rsRepositoryGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface rsRepositoryOrdering {
/**
 * Field to order repositories by.
 * If none provided, the default order is by repository name.
 */
field?: (rsRepositoryListSortField | null),
/**
 * Order of the repositories.
 * If none provided, the default order is ascending.
 */
order?: (SortOrder | null)}

export interface rsRepositoryPropertiesGenqlSelection{
    preventDisable?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface rsSkillGenqlSelection{
    /** The namespace of the skill. */
    namespace?: boolean | number
    /** The name of the skill. */
    name?: boolean | number
    /**
     * Optional: not needed for Docker Hub.
     * 
     * The configuration name of the skill.
     */
    configurationName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface rsSkillInput {
/** The namespace of the skill. */
namespace: Scalars['String'],
/** The name of the skill. */
name: Scalars['String'],
/**
 * Optional: not needed for Docker Hub.
 * 
 * The configuration name of the skill.
 */
configurationName?: (Scalars['String'] | null)}


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    


    const Mutation_possibleTypes: string[] = ['Mutation']
    export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
      return Mutation_possibleTypes.includes(obj.__typename)
    }
    


    const AddImageToStreamResult_possibleTypes: string[] = ['AddImageToStreamResult']
    export const isAddImageToStreamResult = (obj?: { __typename?: any } | null): obj is AddImageToStreamResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAddImageToStreamResult"')
      return AddImageToStreamResult_possibleTypes.includes(obj.__typename)
    }
    


    const AddVulnerabilityExceptionResult_possibleTypes: string[] = ['AddVulnerabilityExceptionResult']
    export const isAddVulnerabilityExceptionResult = (obj?: { __typename?: any } | null): obj is AddVulnerabilityExceptionResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAddVulnerabilityExceptionResult"')
      return AddVulnerabilityExceptionResult_possibleTypes.includes(obj.__typename)
    }
    


    const AllStrVulnerabilityReports_possibleTypes: string[] = ['AllStrVulnerabilityReports']
    export const isAllStrVulnerabilityReports = (obj?: { __typename?: any } | null): obj is AllStrVulnerabilityReports => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAllStrVulnerabilityReports"')
      return AllStrVulnerabilityReports_possibleTypes.includes(obj.__typename)
    }
    


    const AllStrVulnerabilityReportsResult_possibleTypes: string[] = ['AllStrVulnerabilityReportsResult']
    export const isAllStrVulnerabilityReportsResult = (obj?: { __typename?: any } | null): obj is AllStrVulnerabilityReportsResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAllStrVulnerabilityReportsResult"')
      return AllStrVulnerabilityReportsResult_possibleTypes.includes(obj.__typename)
    }
    


    const BaseScPolicy_possibleTypes: string[] = ['ScBooleanPolicy','ScGenericPolicy','ScLicencePolicy','ScVulnerabilityPolicy']
    export const isBaseScPolicy = (obj?: { __typename?: any } | null): obj is BaseScPolicy => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBaseScPolicy"')
      return BaseScPolicy_possibleTypes.includes(obj.__typename)
    }
    


    const BaseScVulnerabilityExceptionSource_possibleTypes: string[] = ['ScVulnerabilityExceptionScoutSource','ScVulnerabilityExceptionVEXSource']
    export const isBaseScVulnerabilityExceptionSource = (obj?: { __typename?: any } | null): obj is BaseScVulnerabilityExceptionSource => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBaseScVulnerabilityExceptionSource"')
      return BaseScVulnerabilityExceptionSource_possibleTypes.includes(obj.__typename)
    }
    


    const BiImageLayers_possibleTypes: string[] = ['BiImageLayers']
    export const isBiImageLayers = (obj?: { __typename?: any } | null): obj is BiImageLayers => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBiImageLayers"')
      return BiImageLayers_possibleTypes.includes(obj.__typename)
    }
    


    const BiLayerMatch_possibleTypes: string[] = ['BiLayerMatch']
    export const isBiLayerMatch = (obj?: { __typename?: any } | null): obj is BiLayerMatch => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBiLayerMatch"')
      return BiLayerMatch_possibleTypes.includes(obj.__typename)
    }
    


    const CommonImage_possibleTypes: string[] = ['IbBaseImage','IbImage','ImageWithBaseImage']
    export const isCommonImage = (obj?: { __typename?: any } | null): obj is CommonImage => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCommonImage"')
      return CommonImage_possibleTypes.includes(obj.__typename)
    }
    


    const DetectedSecret_possibleTypes: string[] = ['DetectedSecret']
    export const isDetectedSecret = (obj?: { __typename?: any } | null): obj is DetectedSecret => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDetectedSecret"')
      return DetectedSecret_possibleTypes.includes(obj.__typename)
    }
    


    const DetectedSecretSource_possibleTypes: string[] = ['DetectedSecretSource']
    export const isDetectedSecretSource = (obj?: { __typename?: any } | null): obj is DetectedSecretSource => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDetectedSecretSource"')
      return DetectedSecretSource_possibleTypes.includes(obj.__typename)
    }
    


    const DetectedSecretSourceLocation_possibleTypes: string[] = ['DetectedSecretSourceLocation']
    export const isDetectedSecretSourceLocation = (obj?: { __typename?: any } | null): obj is DetectedSecretSourceLocation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDetectedSecretSourceLocation"')
      return DetectedSecretSourceLocation_possibleTypes.includes(obj.__typename)
    }
    


    const DockerfileLine_possibleTypes: string[] = ['DockerfileLine']
    export const isDockerfileLine = (obj?: { __typename?: any } | null): obj is DockerfileLine => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDockerfileLine"')
      return DockerfileLine_possibleTypes.includes(obj.__typename)
    }
    


    const DockerOrg_possibleTypes: string[] = ['DockerOrg']
    export const isDockerOrg = (obj?: { __typename?: any } | null): obj is DockerOrg => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDockerOrg"')
      return DockerOrg_possibleTypes.includes(obj.__typename)
    }
    


    const EPSS_possibleTypes: string[] = ['EPSS']
    export const isEPSS = (obj?: { __typename?: any } | null): obj is EPSS => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEPSS"')
      return EPSS_possibleTypes.includes(obj.__typename)
    }
    


    const IbAttestation_possibleTypes: string[] = ['IbAttestationGeneric','IbAttestationProvenance']
    export const isIbAttestation = (obj?: { __typename?: any } | null): obj is IbAttestation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbAttestation"')
      return IbAttestation_possibleTypes.includes(obj.__typename)
    }
    


    const IbAttestationGeneric_possibleTypes: string[] = ['IbAttestationGeneric']
    export const isIbAttestationGeneric = (obj?: { __typename?: any } | null): obj is IbAttestationGeneric => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbAttestationGeneric"')
      return IbAttestationGeneric_possibleTypes.includes(obj.__typename)
    }
    


    const IbAttestationProvenance_possibleTypes: string[] = ['IbAttestationProvenance']
    export const isIbAttestationProvenance = (obj?: { __typename?: any } | null): obj is IbAttestationProvenance => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbAttestationProvenance"')
      return IbAttestationProvenance_possibleTypes.includes(obj.__typename)
    }
    


    const IbBaseImage_possibleTypes: string[] = ['IbBaseImage']
    export const isIbBaseImage = (obj?: { __typename?: any } | null): obj is IbBaseImage => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbBaseImage"')
      return IbBaseImage_possibleTypes.includes(obj.__typename)
    }
    


    const IbBaseImageProvenance_possibleTypes: string[] = ['IbBaseImageProvenance']
    export const isIbBaseImageProvenance = (obj?: { __typename?: any } | null): obj is IbBaseImageProvenance => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbBaseImageProvenance"')
      return IbBaseImageProvenance_possibleTypes.includes(obj.__typename)
    }
    


    const IbDockerFile_possibleTypes: string[] = ['IbDockerFile']
    export const isIbDockerFile = (obj?: { __typename?: any } | null): obj is IbDockerFile => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbDockerFile"')
      return IbDockerFile_possibleTypes.includes(obj.__typename)
    }
    


    const IbDockerfileProvenance_possibleTypes: string[] = ['IbDockerfileProvenance']
    export const isIbDockerfileProvenance = (obj?: { __typename?: any } | null): obj is IbDockerfileProvenance => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbDockerfileProvenance"')
      return IbDockerfileProvenance_possibleTypes.includes(obj.__typename)
    }
    


    const IbGitCommit_possibleTypes: string[] = ['IbGitCommit']
    export const isIbGitCommit = (obj?: { __typename?: any } | null): obj is IbGitCommit => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbGitCommit"')
      return IbGitCommit_possibleTypes.includes(obj.__typename)
    }
    


    const IbGithubPullRequest_possibleTypes: string[] = ['IbGithubPullRequest']
    export const isIbGithubPullRequest = (obj?: { __typename?: any } | null): obj is IbGithubPullRequest => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbGithubPullRequest"')
      return IbGithubPullRequest_possibleTypes.includes(obj.__typename)
    }
    


    const IbGitOrg_possibleTypes: string[] = ['IbGitOrg']
    export const isIbGitOrg = (obj?: { __typename?: any } | null): obj is IbGitOrg => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbGitOrg"')
      return IbGitOrg_possibleTypes.includes(obj.__typename)
    }
    


    const IbGitProvenance_possibleTypes: string[] = ['IbGitProvenance']
    export const isIbGitProvenance = (obj?: { __typename?: any } | null): obj is IbGitProvenance => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbGitProvenance"')
      return IbGitProvenance_possibleTypes.includes(obj.__typename)
    }
    


    const IbGitPullRequest_possibleTypes: string[] = ['IbGithubPullRequest']
    export const isIbGitPullRequest = (obj?: { __typename?: any } | null): obj is IbGitPullRequest => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbGitPullRequest"')
      return IbGitPullRequest_possibleTypes.includes(obj.__typename)
    }
    


    const IbGitRef_possibleTypes: string[] = ['IbGitRef']
    export const isIbGitRef = (obj?: { __typename?: any } | null): obj is IbGitRef => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbGitRef"')
      return IbGitRef_possibleTypes.includes(obj.__typename)
    }
    


    const IbGitRepo_possibleTypes: string[] = ['IbGitRepo']
    export const isIbGitRepo = (obj?: { __typename?: any } | null): obj is IbGitRepo => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbGitRepo"')
      return IbGitRepo_possibleTypes.includes(obj.__typename)
    }
    


    const IbGitRepository_possibleTypes: string[] = ['IbGitRepository']
    export const isIbGitRepository = (obj?: { __typename?: any } | null): obj is IbGitRepository => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbGitRepository"')
      return IbGitRepository_possibleTypes.includes(obj.__typename)
    }
    


    const IbGitUser_possibleTypes: string[] = ['IbGitUser']
    export const isIbGitUser = (obj?: { __typename?: any } | null): obj is IbGitUser => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbGitUser"')
      return IbGitUser_possibleTypes.includes(obj.__typename)
    }
    


    const IbImage_possibleTypes: string[] = ['IbImage']
    export const isIbImage = (obj?: { __typename?: any } | null): obj is IbImage => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbImage"')
      return IbImage_possibleTypes.includes(obj.__typename)
    }
    


    const IbImagePlatform_possibleTypes: string[] = ['IbImagePlatform']
    export const isIbImagePlatform = (obj?: { __typename?: any } | null): obj is IbImagePlatform => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbImagePlatform"')
      return IbImagePlatform_possibleTypes.includes(obj.__typename)
    }
    


    const IbImageRepository_possibleTypes: string[] = ['IbImageRepository']
    export const isIbImageRepository = (obj?: { __typename?: any } | null): obj is IbImageRepository => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbImageRepository"')
      return IbImageRepository_possibleTypes.includes(obj.__typename)
    }
    


    const IbLabel_possibleTypes: string[] = ['IbLabel']
    export const isIbLabel = (obj?: { __typename?: any } | null): obj is IbLabel => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbLabel"')
      return IbLabel_possibleTypes.includes(obj.__typename)
    }
    


    const IbMatchedImages_possibleTypes: string[] = ['IbMatchedImages']
    export const isIbMatchedImages = (obj?: { __typename?: any } | null): obj is IbMatchedImages => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbMatchedImages"')
      return IbMatchedImages_possibleTypes.includes(obj.__typename)
    }
    


    const IbMaterialProvenance_possibleTypes: string[] = ['IbMaterialProvenance']
    export const isIbMaterialProvenance = (obj?: { __typename?: any } | null): obj is IbMaterialProvenance => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbMaterialProvenance"')
      return IbMaterialProvenance_possibleTypes.includes(obj.__typename)
    }
    


    const IbProvenanceAttestation_possibleTypes: string[] = ['IbProvenanceAttestation']
    export const isIbProvenanceAttestation = (obj?: { __typename?: any } | null): obj is IbProvenanceAttestation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbProvenanceAttestation"')
      return IbProvenanceAttestation_possibleTypes.includes(obj.__typename)
    }
    


    const IbTag_possibleTypes: string[] = ['IbTag']
    export const isIbTag = (obj?: { __typename?: any } | null): obj is IbTag => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbTag"')
      return IbTag_possibleTypes.includes(obj.__typename)
    }
    


    const IbVulnerabilityReport_possibleTypes: string[] = ['IbVulnerabilityReport']
    export const isIbVulnerabilityReport = (obj?: { __typename?: any } | null): obj is IbVulnerabilityReport => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIbVulnerabilityReport"')
      return IbVulnerabilityReport_possibleTypes.includes(obj.__typename)
    }
    


    const IdDetectedSecrets_possibleTypes: string[] = ['IdDetectedSecrets']
    export const isIdDetectedSecrets = (obj?: { __typename?: any } | null): obj is IdDetectedSecrets => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIdDetectedSecrets"')
      return IdDetectedSecrets_possibleTypes.includes(obj.__typename)
    }
    


    const ImageHistory_possibleTypes: string[] = ['ImageHistory']
    export const isImageHistory = (obj?: { __typename?: any } | null): obj is ImageHistory => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isImageHistory"')
      return ImageHistory_possibleTypes.includes(obj.__typename)
    }
    


    const ImageLayer_possibleTypes: string[] = ['ImageLayer']
    export const isImageLayer = (obj?: { __typename?: any } | null): obj is ImageLayer => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isImageLayer"')
      return ImageLayer_possibleTypes.includes(obj.__typename)
    }
    


    const ImageWithBaseImage_possibleTypes: string[] = ['ImageWithBaseImage']
    export const isImageWithBaseImage = (obj?: { __typename?: any } | null): obj is ImageWithBaseImage => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isImageWithBaseImage"')
      return ImageWithBaseImage_possibleTypes.includes(obj.__typename)
    }
    


    const IndexImageResult_possibleTypes: string[] = ['IndexImageResult']
    export const isIndexImageResult = (obj?: { __typename?: any } | null): obj is IndexImageResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIndexImageResult"')
      return IndexImageResult_possibleTypes.includes(obj.__typename)
    }
    


    const IpImageLayer_possibleTypes: string[] = ['IpImageLayer']
    export const isIpImageLayer = (obj?: { __typename?: any } | null): obj is IpImageLayer => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIpImageLayer"')
      return IpImageLayer_possibleTypes.includes(obj.__typename)
    }
    


    const IpImageLayers_possibleTypes: string[] = ['IpImageLayers']
    export const isIpImageLayers = (obj?: { __typename?: any } | null): obj is IpImageLayers => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIpImageLayers"')
      return IpImageLayers_possibleTypes.includes(obj.__typename)
    }
    


    const IpImagePackage_possibleTypes: string[] = ['IpImagePackage']
    export const isIpImagePackage = (obj?: { __typename?: any } | null): obj is IpImagePackage => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIpImagePackage"')
      return IpImagePackage_possibleTypes.includes(obj.__typename)
    }
    


    const IpImagePackages_possibleTypes: string[] = ['IpImagePackages']
    export const isIpImagePackages = (obj?: { __typename?: any } | null): obj is IpImagePackages => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIpImagePackages"')
      return IpImagePackages_possibleTypes.includes(obj.__typename)
    }
    


    const IpImagePackagesByDigest_possibleTypes: string[] = ['IpImagePackagesByDigest']
    export const isIpImagePackagesByDigest = (obj?: { __typename?: any } | null): obj is IpImagePackagesByDigest => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIpImagePackagesByDigest"')
      return IpImagePackagesByDigest_possibleTypes.includes(obj.__typename)
    }
    


    const IpImagePackagesForImageCoords_possibleTypes: string[] = ['IpImagePackagesForImageCoords']
    export const isIpImagePackagesForImageCoords = (obj?: { __typename?: any } | null): obj is IpImagePackagesForImageCoords => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIpImagePackagesForImageCoords"')
      return IpImagePackagesForImageCoords_possibleTypes.includes(obj.__typename)
    }
    


    const Package_possibleTypes: string[] = ['Package']
    export const isPackage = (obj?: { __typename?: any } | null): obj is Package => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPackage"')
      return Package_possibleTypes.includes(obj.__typename)
    }
    


    const PackageLocation_possibleTypes: string[] = ['PackageLocation']
    export const isPackageLocation = (obj?: { __typename?: any } | null): obj is PackageLocation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPackageLocation"')
      return PackageLocation_possibleTypes.includes(obj.__typename)
    }
    


    const Paging_possibleTypes: string[] = ['Paging']
    export const isPaging = (obj?: { __typename?: any } | null): obj is Paging => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaging"')
      return Paging_possibleTypes.includes(obj.__typename)
    }
    


    const PkVexStatement_possibleTypes: string[] = ['PkVexStatement']
    export const isPkVexStatement = (obj?: { __typename?: any } | null): obj is PkVexStatement => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPkVexStatement"')
      return PkVexStatement_possibleTypes.includes(obj.__typename)
    }
    


    const PkVulnerabilityException_possibleTypes: string[] = ['PkVulnerabilityException']
    export const isPkVulnerabilityException = (obj?: { __typename?: any } | null): obj is PkVulnerabilityException => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPkVulnerabilityException"')
      return PkVulnerabilityException_possibleTypes.includes(obj.__typename)
    }
    


    const RemoveVulnerabilityExceptionResult_possibleTypes: string[] = ['RemoveVulnerabilityExceptionResult']
    export const isRemoveVulnerabilityExceptionResult = (obj?: { __typename?: any } | null): obj is RemoveVulnerabilityExceptionResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRemoveVulnerabilityExceptionResult"')
      return RemoveVulnerabilityExceptionResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScBaseImageSummary_possibleTypes: string[] = ['ScBaseImageSummary']
    export const isScBaseImageSummary = (obj?: { __typename?: any } | null): obj is ScBaseImageSummary => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScBaseImageSummary"')
      return ScBaseImageSummary_possibleTypes.includes(obj.__typename)
    }
    


    const ScBooleanPolicy_possibleTypes: string[] = ['ScBooleanPolicy']
    export const isScBooleanPolicy = (obj?: { __typename?: any } | null): obj is ScBooleanPolicy => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScBooleanPolicy"')
      return ScBooleanPolicy_possibleTypes.includes(obj.__typename)
    }
    


    const ScBooleanPolicyResult_possibleTypes: string[] = ['ScBooleanPolicyResult']
    export const isScBooleanPolicyResult = (obj?: { __typename?: any } | null): obj is ScBooleanPolicyResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScBooleanPolicyResult"')
      return ScBooleanPolicyResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScDockerRepository_possibleTypes: string[] = ['ScDockerRepository']
    export const isScDockerRepository = (obj?: { __typename?: any } | null): obj is ScDockerRepository => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScDockerRepository"')
      return ScDockerRepository_possibleTypes.includes(obj.__typename)
    }
    


    const ScGenericPolicy_possibleTypes: string[] = ['ScGenericPolicy']
    export const isScGenericPolicy = (obj?: { __typename?: any } | null): obj is ScGenericPolicy => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScGenericPolicy"')
      return ScGenericPolicy_possibleTypes.includes(obj.__typename)
    }
    


    const ScGenericPolicyResult_possibleTypes: string[] = ['ScGenericPolicyResult']
    export const isScGenericPolicyResult = (obj?: { __typename?: any } | null): obj is ScGenericPolicyResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScGenericPolicyResult"')
      return ScGenericPolicyResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScGroupedPackage_possibleTypes: string[] = ['ScGroupedPackage']
    export const isScGroupedPackage = (obj?: { __typename?: any } | null): obj is ScGroupedPackage => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScGroupedPackage"')
      return ScGroupedPackage_possibleTypes.includes(obj.__typename)
    }
    


    const ScImageAffectedByCVE_possibleTypes: string[] = ['ScImageAffectedByCVE']
    export const isScImageAffectedByCVE = (obj?: { __typename?: any } | null): obj is ScImageAffectedByCVE => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScImageAffectedByCVE"')
      return ScImageAffectedByCVE_possibleTypes.includes(obj.__typename)
    }
    


    const ScImageAffectedByCVEChangeset_possibleTypes: string[] = ['ScImageAffectedByCVEChangeset']
    export const isScImageAffectedByCVEChangeset = (obj?: { __typename?: any } | null): obj is ScImageAffectedByCVEChangeset => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScImageAffectedByCVEChangeset"')
      return ScImageAffectedByCVEChangeset_possibleTypes.includes(obj.__typename)
    }
    


    const ScImageAffectedByCVEPackage_possibleTypes: string[] = ['ScImageAffectedByCVEPackage']
    export const isScImageAffectedByCVEPackage = (obj?: { __typename?: any } | null): obj is ScImageAffectedByCVEPackage => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScImageAffectedByCVEPackage"')
      return ScImageAffectedByCVEPackage_possibleTypes.includes(obj.__typename)
    }
    


    const ScImageChangeset_possibleTypes: string[] = ['ScImageChangeset']
    export const isScImageChangeset = (obj?: { __typename?: any } | null): obj is ScImageChangeset => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScImageChangeset"')
      return ScImageChangeset_possibleTypes.includes(obj.__typename)
    }
    


    const ScImageHistory_possibleTypes: string[] = ['ScImageHistory']
    export const isScImageHistory = (obj?: { __typename?: any } | null): obj is ScImageHistory => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScImageHistory"')
      return ScImageHistory_possibleTypes.includes(obj.__typename)
    }
    


    const ScImageLayer_possibleTypes: string[] = ['ScImageLayer']
    export const isScImageLayer = (obj?: { __typename?: any } | null): obj is ScImageLayer => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScImageLayer"')
      return ScImageLayer_possibleTypes.includes(obj.__typename)
    }
    


    const ScImageRepository_possibleTypes: string[] = ['ScImageRepository']
    export const isScImageRepository = (obj?: { __typename?: any } | null): obj is ScImageRepository => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScImageRepository"')
      return ScImageRepository_possibleTypes.includes(obj.__typename)
    }
    


    const ScImagesAffectedByCVEResult_possibleTypes: string[] = ['ScImagesAffectedByCVEResult']
    export const isScImagesAffectedByCVEResult = (obj?: { __typename?: any } | null): obj is ScImagesAffectedByCVEResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScImagesAffectedByCVEResult"')
      return ScImagesAffectedByCVEResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScImageVulnerabilitiesByDigest_possibleTypes: string[] = ['ScImageVulnerabilitiesByDigest']
    export const isScImageVulnerabilitiesByDigest = (obj?: { __typename?: any } | null): obj is ScImageVulnerabilitiesByDigest => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScImageVulnerabilitiesByDigest"')
      return ScImageVulnerabilitiesByDigest_possibleTypes.includes(obj.__typename)
    }
    


    const ScInformationRemediation_possibleTypes: string[] = ['ScInformationRemediation']
    export const isScInformationRemediation = (obj?: { __typename?: any } | null): obj is ScInformationRemediation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScInformationRemediation"')
      return ScInformationRemediation_possibleTypes.includes(obj.__typename)
    }
    


    const ScLicencePolicy_possibleTypes: string[] = ['ScLicencePolicy']
    export const isScLicencePolicy = (obj?: { __typename?: any } | null): obj is ScLicencePolicy => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScLicencePolicy"')
      return ScLicencePolicy_possibleTypes.includes(obj.__typename)
    }
    


    const ScLicencePolicyResult_possibleTypes: string[] = ['ScLicencePolicyResult']
    export const isScLicencePolicyResult = (obj?: { __typename?: any } | null): obj is ScLicencePolicyResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScLicencePolicyResult"')
      return ScLicencePolicyResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScOrganizationFilter_possibleTypes: string[] = ['ScOrganizationFilter']
    export const isScOrganizationFilter = (obj?: { __typename?: any } | null): obj is ScOrganizationFilter => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScOrganizationFilter"')
      return ScOrganizationFilter_possibleTypes.includes(obj.__typename)
    }
    


    const ScOrganizationStatus_possibleTypes: string[] = ['ScOrganizationStatus']
    export const isScOrganizationStatus = (obj?: { __typename?: any } | null): obj is ScOrganizationStatus => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScOrganizationStatus"')
      return ScOrganizationStatus_possibleTypes.includes(obj.__typename)
    }
    


    const ScPackageRange_possibleTypes: string[] = ['ScPackageRange']
    export const isScPackageRange = (obj?: { __typename?: any } | null): obj is ScPackageRange => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPackageRange"')
      return ScPackageRange_possibleTypes.includes(obj.__typename)
    }
    


    const ScPackageRoot_possibleTypes: string[] = ['ScPackageRoot']
    export const isScPackageRoot = (obj?: { __typename?: any } | null): obj is ScPackageRoot => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPackageRoot"')
      return ScPackageRoot_possibleTypes.includes(obj.__typename)
    }
    


    const ScPolicyDelta_possibleTypes: string[] = ['ScPolicyDelta']
    export const isScPolicyDelta = (obj?: { __typename?: any } | null): obj is ScPolicyDelta => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPolicyDelta"')
      return ScPolicyDelta_possibleTypes.includes(obj.__typename)
    }
    


    const ScPolicyImage_possibleTypes: string[] = ['ScPolicyImage']
    export const isScPolicyImage = (obj?: { __typename?: any } | null): obj is ScPolicyImage => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPolicyImage"')
      return ScPolicyImage_possibleTypes.includes(obj.__typename)
    }
    


    const ScPolicyInfo_possibleTypes: string[] = ['ScPolicyInfo']
    export const isScPolicyInfo = (obj?: { __typename?: any } | null): obj is ScPolicyInfo => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPolicyInfo"')
      return ScPolicyInfo_possibleTypes.includes(obj.__typename)
    }
    


    const ScPolicyPackageLocation_possibleTypes: string[] = ['ScPolicyPackageLocation']
    export const isScPolicyPackageLocation = (obj?: { __typename?: any } | null): obj is ScPolicyPackageLocation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPolicyPackageLocation"')
      return ScPolicyPackageLocation_possibleTypes.includes(obj.__typename)
    }
    


    const ScPolicyRepo_possibleTypes: string[] = ['ScPolicyRepo']
    export const isScPolicyRepo = (obj?: { __typename?: any } | null): obj is ScPolicyRepo => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPolicyRepo"')
      return ScPolicyRepo_possibleTypes.includes(obj.__typename)
    }
    


    const ScPolicyResultGenericDeviation_possibleTypes: string[] = ['ScPolicyResultGenericDeviation']
    export const isScPolicyResultGenericDeviation = (obj?: { __typename?: any } | null): obj is ScPolicyResultGenericDeviation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPolicyResultGenericDeviation"')
      return ScPolicyResultGenericDeviation_possibleTypes.includes(obj.__typename)
    }
    


    const ScPolicyResultGenericDeviationDetail_possibleTypes: string[] = ['ScPolicyResultGenericDeviationDetail']
    export const isScPolicyResultGenericDeviationDetail = (obj?: { __typename?: any } | null): obj is ScPolicyResultGenericDeviationDetail => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPolicyResultGenericDeviationDetail"')
      return ScPolicyResultGenericDeviationDetail_possibleTypes.includes(obj.__typename)
    }
    


    const ScPolicyResultLicenceDeviation_possibleTypes: string[] = ['ScPolicyResultLicenceDeviation']
    export const isScPolicyResultLicenceDeviation = (obj?: { __typename?: any } | null): obj is ScPolicyResultLicenceDeviation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPolicyResultLicenceDeviation"')
      return ScPolicyResultLicenceDeviation_possibleTypes.includes(obj.__typename)
    }
    


    const ScPolicyResultVulnerabilityDeviation_possibleTypes: string[] = ['ScPolicyResultVulnerabilityDeviation']
    export const isScPolicyResultVulnerabilityDeviation = (obj?: { __typename?: any } | null): obj is ScPolicyResultVulnerabilityDeviation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPolicyResultVulnerabilityDeviation"')
      return ScPolicyResultVulnerabilityDeviation_possibleTypes.includes(obj.__typename)
    }
    


    const ScPolicyStream_possibleTypes: string[] = ['ScPolicyStream']
    export const isScPolicyStream = (obj?: { __typename?: any } | null): obj is ScPolicyStream => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPolicyStream"')
      return ScPolicyStream_possibleTypes.includes(obj.__typename)
    }
    


    const ScPolicyStreamResult_possibleTypes: string[] = ['ScPolicyStreamResult']
    export const isScPolicyStreamResult = (obj?: { __typename?: any } | null): obj is ScPolicyStreamResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPolicyStreamResult"')
      return ScPolicyStreamResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScPolicySummary_possibleTypes: string[] = ['ScPolicySummary']
    export const isScPolicySummary = (obj?: { __typename?: any } | null): obj is ScPolicySummary => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPolicySummary"')
      return ScPolicySummary_possibleTypes.includes(obj.__typename)
    }
    


    const ScPolicySummaryDelta_possibleTypes: string[] = ['ScPolicySummaryDelta']
    export const isScPolicySummaryDelta = (obj?: { __typename?: any } | null): obj is ScPolicySummaryDelta => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPolicySummaryDelta"')
      return ScPolicySummaryDelta_possibleTypes.includes(obj.__typename)
    }
    


    const ScPolicySummaryResult_possibleTypes: string[] = ['ScPolicySummaryResult']
    export const isScPolicySummaryResult = (obj?: { __typename?: any } | null): obj is ScPolicySummaryResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPolicySummaryResult"')
      return ScPolicySummaryResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScPullRequestRemediation_possibleTypes: string[] = ['ScPullRequestRemediation']
    export const isScPullRequestRemediation = (obj?: { __typename?: any } | null): obj is ScPullRequestRemediation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPullRequestRemediation"')
      return ScPullRequestRemediation_possibleTypes.includes(obj.__typename)
    }
    


    const ScPurl_possibleTypes: string[] = ['ScPurl']
    export const isScPurl = (obj?: { __typename?: any } | null): obj is ScPurl => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScPurl"')
      return ScPurl_possibleTypes.includes(obj.__typename)
    }
    


    const ScRecentCVE_possibleTypes: string[] = ['ScRecentCVE']
    export const isScRecentCVE = (obj?: { __typename?: any } | null): obj is ScRecentCVE => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScRecentCVE"')
      return ScRecentCVE_possibleTypes.includes(obj.__typename)
    }
    


    const ScRecentCVEsResult_possibleTypes: string[] = ['ScRecentCVEsResult']
    export const isScRecentCVEsResult = (obj?: { __typename?: any } | null): obj is ScRecentCVEsResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScRecentCVEsResult"')
      return ScRecentCVEsResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScRemediation_possibleTypes: string[] = ['ScInformationRemediation','ScPullRequestRemediation']
    export const isScRemediation = (obj?: { __typename?: any } | null): obj is ScRemediation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScRemediation"')
      return ScRemediation_possibleTypes.includes(obj.__typename)
    }
    


    const ScRemediationChangeset_possibleTypes: string[] = ['ScRemediationChangeset']
    export const isScRemediationChangeset = (obj?: { __typename?: any } | null): obj is ScRemediationChangeset => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScRemediationChangeset"')
      return ScRemediationChangeset_possibleTypes.includes(obj.__typename)
    }
    


    const ScRemediationChangesetPatches_possibleTypes: string[] = ['ScRemediationChangesetPatches']
    export const isScRemediationChangesetPatches = (obj?: { __typename?: any } | null): obj is ScRemediationChangesetPatches => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScRemediationChangesetPatches"')
      return ScRemediationChangesetPatches_possibleTypes.includes(obj.__typename)
    }
    


    const ScRemediationDetail_possibleTypes: string[] = ['ScRemediationDetail']
    export const isScRemediationDetail = (obj?: { __typename?: any } | null): obj is ScRemediationDetail => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScRemediationDetail"')
      return ScRemediationDetail_possibleTypes.includes(obj.__typename)
    }
    


    const ScRemediationError_possibleTypes: string[] = ['ScRemediationError']
    export const isScRemediationError = (obj?: { __typename?: any } | null): obj is ScRemediationError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScRemediationError"')
      return ScRemediationError_possibleTypes.includes(obj.__typename)
    }
    


    const ScRemediationErrorDetail_possibleTypes: string[] = ['ScRemediationErrorDetail']
    export const isScRemediationErrorDetail = (obj?: { __typename?: any } | null): obj is ScRemediationErrorDetail => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScRemediationErrorDetail"')
      return ScRemediationErrorDetail_possibleTypes.includes(obj.__typename)
    }
    


    const ScSinglePolicyResult_possibleTypes: string[] = ['ScSinglePolicyResult']
    export const isScSinglePolicyResult = (obj?: { __typename?: any } | null): obj is ScSinglePolicyResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScSinglePolicyResult"')
      return ScSinglePolicyResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScSinglePolicyResults_possibleTypes: string[] = ['ScSinglePolicyResults']
    export const isScSinglePolicyResults = (obj?: { __typename?: any } | null): obj is ScSinglePolicyResults => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScSinglePolicyResults"')
      return ScSinglePolicyResults_possibleTypes.includes(obj.__typename)
    }
    


    const ScStream_possibleTypes: string[] = ['ScStream']
    export const isScStream = (obj?: { __typename?: any } | null): obj is ScStream => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScStream"')
      return ScStream_possibleTypes.includes(obj.__typename)
    }
    


    const ScStreamBaseImagesSummaryResult_possibleTypes: string[] = ['ScStreamBaseImagesSummaryResult']
    export const isScStreamBaseImagesSummaryResult = (obj?: { __typename?: any } | null): obj is ScStreamBaseImagesSummaryResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScStreamBaseImagesSummaryResult"')
      return ScStreamBaseImagesSummaryResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScStreamCVE_possibleTypes: string[] = ['ScStreamCVE']
    export const isScStreamCVE = (obj?: { __typename?: any } | null): obj is ScStreamCVE => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScStreamCVE"')
      return ScStreamCVE_possibleTypes.includes(obj.__typename)
    }
    


    const ScStreamCVEsResult_possibleTypes: string[] = ['ScStreamCVEsResult']
    export const isScStreamCVEsResult = (obj?: { __typename?: any } | null): obj is ScStreamCVEsResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScStreamCVEsResult"')
      return ScStreamCVEsResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScStreamGroupedPackagesResult_possibleTypes: string[] = ['ScStreamGroupedPackagesResult']
    export const isScStreamGroupedPackagesResult = (obj?: { __typename?: any } | null): obj is ScStreamGroupedPackagesResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScStreamGroupedPackagesResult"')
      return ScStreamGroupedPackagesResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScStreamImagesByBaseImageResult_possibleTypes: string[] = ['ScStreamImagesByBaseImageResult']
    export const isScStreamImagesByBaseImageResult = (obj?: { __typename?: any } | null): obj is ScStreamImagesByBaseImageResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScStreamImagesByBaseImageResult"')
      return ScStreamImagesByBaseImageResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScStreamImagesResult_possibleTypes: string[] = ['ScStreamImagesResult']
    export const isScStreamImagesResult = (obj?: { __typename?: any } | null): obj is ScStreamImagesResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScStreamImagesResult"')
      return ScStreamImagesResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScStreamsResult_possibleTypes: string[] = ['ScStreamsResult']
    export const isScStreamsResult = (obj?: { __typename?: any } | null): obj is ScStreamsResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScStreamsResult"')
      return ScStreamsResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScTaggedImagesResult_possibleTypes: string[] = ['ScTaggedImagesResult']
    export const isScTaggedImagesResult = (obj?: { __typename?: any } | null): obj is ScTaggedImagesResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScTaggedImagesResult"')
      return ScTaggedImagesResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScTagWithDigest_possibleTypes: string[] = ['ScTagWithDigest']
    export const isScTagWithDigest = (obj?: { __typename?: any } | null): obj is ScTagWithDigest => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScTagWithDigest"')
      return ScTagWithDigest_possibleTypes.includes(obj.__typename)
    }
    


    const ScUserResult_possibleTypes: string[] = ['ScUserResult']
    export const isScUserResult = (obj?: { __typename?: any } | null): obj is ScUserResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScUserResult"')
      return ScUserResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScVEX_possibleTypes: string[] = ['ScVEX']
    export const isScVEX = (obj?: { __typename?: any } | null): obj is ScVEX => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVEX"')
      return ScVEX_possibleTypes.includes(obj.__typename)
    }
    


    const ScVexDocument_possibleTypes: string[] = ['ScVexDocument']
    export const isScVexDocument = (obj?: { __typename?: any } | null): obj is ScVexDocument => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVexDocument"')
      return ScVexDocument_possibleTypes.includes(obj.__typename)
    }
    


    const ScVEXsResult_possibleTypes: string[] = ['ScVEXsResult']
    export const isScVEXsResult = (obj?: { __typename?: any } | null): obj is ScVEXsResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVEXsResult"')
      return ScVEXsResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScVexStatement_possibleTypes: string[] = ['ScVexStatement']
    export const isScVexStatement = (obj?: { __typename?: any } | null): obj is ScVexStatement => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVexStatement"')
      return ScVexStatement_possibleTypes.includes(obj.__typename)
    }
    


    const ScVEXStatement_possibleTypes: string[] = ['ScVEXStatement']
    export const isScVEXStatement = (obj?: { __typename?: any } | null): obj is ScVEXStatement => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVEXStatement"')
      return ScVEXStatement_possibleTypes.includes(obj.__typename)
    }
    


    const ScVexStatementError_possibleTypes: string[] = ['ScVexStatementError']
    export const isScVexStatementError = (obj?: { __typename?: any } | null): obj is ScVexStatementError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVexStatementError"')
      return ScVexStatementError_possibleTypes.includes(obj.__typename)
    }
    


    const ScVexStatementImageScope_possibleTypes: string[] = ['ScVexStatementImageScope']
    export const isScVexStatementImageScope = (obj?: { __typename?: any } | null): obj is ScVexStatementImageScope => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVexStatementImageScope"')
      return ScVexStatementImageScope_possibleTypes.includes(obj.__typename)
    }
    


    const ScVexStatementPackageScope_possibleTypes: string[] = ['ScVexStatementPackageScope']
    export const isScVexStatementPackageScope = (obj?: { __typename?: any } | null): obj is ScVexStatementPackageScope => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVexStatementPackageScope"')
      return ScVexStatementPackageScope_possibleTypes.includes(obj.__typename)
    }
    


    const ScVexStatementsQueryResult_possibleTypes: string[] = ['ScVexStatementsQueryResult']
    export const isScVexStatementsQueryResult = (obj?: { __typename?: any } | null): obj is ScVexStatementsQueryResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVexStatementsQueryResult"')
      return ScVexStatementsQueryResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScVulnerabilityException_possibleTypes: string[] = ['ScVulnerabilityException']
    export const isScVulnerabilityException = (obj?: { __typename?: any } | null): obj is ScVulnerabilityException => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVulnerabilityException"')
      return ScVulnerabilityException_possibleTypes.includes(obj.__typename)
    }
    


    const ScVulnerabilityExceptionError_possibleTypes: string[] = ['ScVulnerabilityExceptionError']
    export const isScVulnerabilityExceptionError = (obj?: { __typename?: any } | null): obj is ScVulnerabilityExceptionError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVulnerabilityExceptionError"')
      return ScVulnerabilityExceptionError_possibleTypes.includes(obj.__typename)
    }
    


    const ScVulnerabilityExceptionImageScope_possibleTypes: string[] = ['ScVulnerabilityExceptionImageScope']
    export const isScVulnerabilityExceptionImageScope = (obj?: { __typename?: any } | null): obj is ScVulnerabilityExceptionImageScope => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVulnerabilityExceptionImageScope"')
      return ScVulnerabilityExceptionImageScope_possibleTypes.includes(obj.__typename)
    }
    


    const ScVulnerabilityExceptionPackageScope_possibleTypes: string[] = ['ScVulnerabilityExceptionPackageScope']
    export const isScVulnerabilityExceptionPackageScope = (obj?: { __typename?: any } | null): obj is ScVulnerabilityExceptionPackageScope => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVulnerabilityExceptionPackageScope"')
      return ScVulnerabilityExceptionPackageScope_possibleTypes.includes(obj.__typename)
    }
    


    const ScVulnerabilityExceptionReason_possibleTypes: string[] = ['ScVulnerabilityExceptionReason']
    export const isScVulnerabilityExceptionReason = (obj?: { __typename?: any } | null): obj is ScVulnerabilityExceptionReason => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVulnerabilityExceptionReason"')
      return ScVulnerabilityExceptionReason_possibleTypes.includes(obj.__typename)
    }
    


    const ScVulnerabilityExceptionScoutSource_possibleTypes: string[] = ['ScVulnerabilityExceptionScoutSource']
    export const isScVulnerabilityExceptionScoutSource = (obj?: { __typename?: any } | null): obj is ScVulnerabilityExceptionScoutSource => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVulnerabilityExceptionScoutSource"')
      return ScVulnerabilityExceptionScoutSource_possibleTypes.includes(obj.__typename)
    }
    


    const ScVulnerabilityExceptionVEXSource_possibleTypes: string[] = ['ScVulnerabilityExceptionVEXSource']
    export const isScVulnerabilityExceptionVEXSource = (obj?: { __typename?: any } | null): obj is ScVulnerabilityExceptionVEXSource => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVulnerabilityExceptionVEXSource"')
      return ScVulnerabilityExceptionVEXSource_possibleTypes.includes(obj.__typename)
    }
    


    const ScVulnerabilityExceptionVulnerability_possibleTypes: string[] = ['ScVulnerabilityExceptionVulnerability']
    export const isScVulnerabilityExceptionVulnerability = (obj?: { __typename?: any } | null): obj is ScVulnerabilityExceptionVulnerability => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVulnerabilityExceptionVulnerability"')
      return ScVulnerabilityExceptionVulnerability_possibleTypes.includes(obj.__typename)
    }
    


    const ScVulnerabilityPolicy_possibleTypes: string[] = ['ScVulnerabilityPolicy']
    export const isScVulnerabilityPolicy = (obj?: { __typename?: any } | null): obj is ScVulnerabilityPolicy => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVulnerabilityPolicy"')
      return ScVulnerabilityPolicy_possibleTypes.includes(obj.__typename)
    }
    


    const ScVulnerabilityPolicyResult_possibleTypes: string[] = ['ScVulnerabilityPolicyResult']
    export const isScVulnerabilityPolicyResult = (obj?: { __typename?: any } | null): obj is ScVulnerabilityPolicyResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScVulnerabilityPolicyResult"')
      return ScVulnerabilityPolicyResult_possibleTypes.includes(obj.__typename)
    }
    


    const SdImageSummary_possibleTypes: string[] = ['SdImageSummary']
    export const isSdImageSummary = (obj?: { __typename?: any } | null): obj is SdImageSummary => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSdImageSummary"')
      return SdImageSummary_possibleTypes.includes(obj.__typename)
    }
    


    const SecretFinding_possibleTypes: string[] = ['SecretFinding']
    export const isSecretFinding = (obj?: { __typename?: any } | null): obj is SecretFinding => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSecretFinding"')
      return SecretFinding_possibleTypes.includes(obj.__typename)
    }
    


    const SetStreamImagesResult_possibleTypes: string[] = ['SetStreamImagesResult']
    export const isSetStreamImagesResult = (obj?: { __typename?: any } | null): obj is SetStreamImagesResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSetStreamImagesResult"')
      return SetStreamImagesResult_possibleTypes.includes(obj.__typename)
    }
    


    const StreamCVEPackage_possibleTypes: string[] = ['StreamCVEPackage']
    export const isStreamCVEPackage = (obj?: { __typename?: any } | null): obj is StreamCVEPackage => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isStreamCVEPackage"')
      return StreamCVEPackage_possibleTypes.includes(obj.__typename)
    }
    


    const StrVulnerabilityReports_possibleTypes: string[] = ['StrVulnerabilityReports']
    export const isStrVulnerabilityReports = (obj?: { __typename?: any } | null): obj is StrVulnerabilityReports => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isStrVulnerabilityReports"')
      return StrVulnerabilityReports_possibleTypes.includes(obj.__typename)
    }
    


    const TimestampedVulnerabilityReport_possibleTypes: string[] = ['TimestampedVulnerabilityReport']
    export const isTimestampedVulnerabilityReport = (obj?: { __typename?: any } | null): obj is TimestampedVulnerabilityReport => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTimestampedVulnerabilityReport"')
      return TimestampedVulnerabilityReport_possibleTypes.includes(obj.__typename)
    }
    


    const TrDockerRepository_possibleTypes: string[] = ['TrDockerRepository']
    export const isTrDockerRepository = (obj?: { __typename?: any } | null): obj is TrDockerRepository => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrDockerRepository"')
      return TrDockerRepository_possibleTypes.includes(obj.__typename)
    }
    


    const TrDockerTag_possibleTypes: string[] = ['TrDockerTag']
    export const isTrDockerTag = (obj?: { __typename?: any } | null): obj is TrDockerTag => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrDockerTag"')
      return TrDockerTag_possibleTypes.includes(obj.__typename)
    }
    


    const TrRecommendations_possibleTypes: string[] = ['TrRecommendations']
    export const isTrRecommendations = (obj?: { __typename?: any } | null): obj is TrRecommendations => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrRecommendations"')
      return TrRecommendations_possibleTypes.includes(obj.__typename)
    }
    


    const TrRecommendedTags_possibleTypes: string[] = ['TrRecommendedTags']
    export const isTrRecommendedTags = (obj?: { __typename?: any } | null): obj is TrRecommendedTags => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrRecommendedTags"')
      return TrRecommendedTags_possibleTypes.includes(obj.__typename)
    }
    


    const TrScoring_possibleTypes: string[] = ['TrScoring']
    export const isTrScoring = (obj?: { __typename?: any } | null): obj is TrScoring => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrScoring"')
      return TrScoring_possibleTypes.includes(obj.__typename)
    }
    


    const TrScoringDetails_possibleTypes: string[] = ['TrScoringDetails']
    export const isTrScoringDetails = (obj?: { __typename?: any } | null): obj is TrScoringDetails => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrScoringDetails"')
      return TrScoringDetails_possibleTypes.includes(obj.__typename)
    }
    


    const TrTagData_possibleTypes: string[] = ['TrTagData']
    export const isTrTagData = (obj?: { __typename?: any } | null): obj is TrTagData => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrTagData"')
      return TrTagData_possibleTypes.includes(obj.__typename)
    }
    


    const TrTagRecommendationResult_possibleTypes: string[] = ['TrTagRecommendationResult']
    export const isTrTagRecommendationResult = (obj?: { __typename?: any } | null): obj is TrTagRecommendationResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrTagRecommendationResult"')
      return TrTagRecommendationResult_possibleTypes.includes(obj.__typename)
    }
    


    const TrTagRecommendationsByDigestsResult_possibleTypes: string[] = ['TrTagRecommendationsByDigestsResult']
    export const isTrTagRecommendationsByDigestsResult = (obj?: { __typename?: any } | null): obj is TrTagRecommendationsByDigestsResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrTagRecommendationsByDigestsResult"')
      return TrTagRecommendationsByDigestsResult_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateVulnerabilityExceptionResult_possibleTypes: string[] = ['UpdateVulnerabilityExceptionResult']
    export const isUpdateVulnerabilityExceptionResult = (obj?: { __typename?: any } | null): obj is UpdateVulnerabilityExceptionResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateVulnerabilityExceptionResult"')
      return UpdateVulnerabilityExceptionResult_possibleTypes.includes(obj.__typename)
    }
    


    const VpCVSS_possibleTypes: string[] = ['VpCVSS']
    export const isVpCVSS = (obj?: { __typename?: any } | null): obj is VpCVSS => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVpCVSS"')
      return VpCVSS_possibleTypes.includes(obj.__typename)
    }
    


    const VpCWE_possibleTypes: string[] = ['VpCWE']
    export const isVpCWE = (obj?: { __typename?: any } | null): obj is VpCWE => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVpCWE"')
      return VpCWE_possibleTypes.includes(obj.__typename)
    }
    


    const VpPackageVulnerability_possibleTypes: string[] = ['VpPackageVulnerability']
    export const isVpPackageVulnerability = (obj?: { __typename?: any } | null): obj is VpPackageVulnerability => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVpPackageVulnerability"')
      return VpPackageVulnerability_possibleTypes.includes(obj.__typename)
    }
    


    const VpVulnerability_possibleTypes: string[] = ['VpVulnerability']
    export const isVpVulnerability = (obj?: { __typename?: any } | null): obj is VpVulnerability => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVpVulnerability"')
      return VpVulnerability_possibleTypes.includes(obj.__typename)
    }
    


    const VulnerabilityReport_possibleTypes: string[] = ['VulnerabilityReport']
    export const isVulnerabilityReport = (obj?: { __typename?: any } | null): obj is VulnerabilityReport => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVulnerabilityReport"')
      return VulnerabilityReport_possibleTypes.includes(obj.__typename)
    }
    


    const ArtifactoryAgentEntitlement_possibleTypes: string[] = ['ArtifactoryAgentEntitlement']
    export const isArtifactoryAgentEntitlement = (obj?: { __typename?: any } | null): obj is ArtifactoryAgentEntitlement => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isArtifactoryAgentEntitlement"')
      return ArtifactoryAgentEntitlement_possibleTypes.includes(obj.__typename)
    }
    


    const BlockedRepoResult_possibleTypes: string[] = ['BlockedRepoResult']
    export const isBlockedRepoResult = (obj?: { __typename?: any } | null): obj is BlockedRepoResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBlockedRepoResult"')
      return BlockedRepoResult_possibleTypes.includes(obj.__typename)
    }
    


    const ConfigurablePolicyEntitlement_possibleTypes: string[] = ['ConfigurablePolicyEntitlement']
    export const isConfigurablePolicyEntitlement = (obj?: { __typename?: any } | null): obj is ConfigurablePolicyEntitlement => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isConfigurablePolicyEntitlement"')
      return ConfigurablePolicyEntitlement_possibleTypes.includes(obj.__typename)
    }
    


    const DhiEntitlement_possibleTypes: string[] = ['DhiEntitlement']
    export const isDhiEntitlement = (obj?: { __typename?: any } | null): obj is DhiEntitlement => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiEntitlement"')
      return DhiEntitlement_possibleTypes.includes(obj.__typename)
    }
    


    const DhiRepoFeature_possibleTypes: string[] = ['DhiRepoFeature']
    export const isDhiRepoFeature = (obj?: { __typename?: any } | null): obj is DhiRepoFeature => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiRepoFeature"')
      return DhiRepoFeature_possibleTypes.includes(obj.__typename)
    }
    


    const EnabledRepositoriesResult_possibleTypes: string[] = ['EnabledRepositoriesResult']
    export const isEnabledRepositoriesResult = (obj?: { __typename?: any } | null): obj is EnabledRepositoriesResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEnabledRepositoriesResult"')
      return EnabledRepositoriesResult_possibleTypes.includes(obj.__typename)
    }
    


    const EntitlementsDhiMirroredRepository_possibleTypes: string[] = ['EntitlementsDhiMirroredRepository']
    export const isEntitlementsDhiMirroredRepository = (obj?: { __typename?: any } | null): obj is EntitlementsDhiMirroredRepository => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEntitlementsDhiMirroredRepository"')
      return EntitlementsDhiMirroredRepository_possibleTypes.includes(obj.__typename)
    }
    


    const EntitlementsDhiSourceRepository_possibleTypes: string[] = ['EntitlementsDhiSourceRepository']
    export const isEntitlementsDhiSourceRepository = (obj?: { __typename?: any } | null): obj is EntitlementsDhiSourceRepository => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEntitlementsDhiSourceRepository"')
      return EntitlementsDhiSourceRepository_possibleTypes.includes(obj.__typename)
    }
    


    const FeatureEntitlement_possibleTypes: string[] = ['ArtifactoryAgentEntitlement','ConfigurablePolicyEntitlement','LocalRepositoryEntitlement','RemoteRepositoryEntitlement','VulnerabilityReportingEntitlement']
    export const isFeatureEntitlement = (obj?: { __typename?: any } | null): obj is FeatureEntitlement => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFeatureEntitlement"')
      return FeatureEntitlement_possibleTypes.includes(obj.__typename)
    }
    


    const FeatureEntitlements_possibleTypes: string[] = ['FeatureEntitlements']
    export const isFeatureEntitlements = (obj?: { __typename?: any } | null): obj is FeatureEntitlements => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFeatureEntitlements"')
      return FeatureEntitlements_possibleTypes.includes(obj.__typename)
    }
    


    const Integration_possibleTypes: string[] = ['Integration']
    export const isIntegration = (obj?: { __typename?: any } | null): obj is Integration => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIntegration"')
      return Integration_possibleTypes.includes(obj.__typename)
    }
    


    const ListBlockedReposResult_possibleTypes: string[] = ['ListBlockedReposResult']
    export const isListBlockedReposResult = (obj?: { __typename?: any } | null): obj is ListBlockedReposResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isListBlockedReposResult"')
      return ListBlockedReposResult_possibleTypes.includes(obj.__typename)
    }
    


    const LocalRepositoryEntitlement_possibleTypes: string[] = ['LocalRepositoryEntitlement']
    export const isLocalRepositoryEntitlement = (obj?: { __typename?: any } | null): obj is LocalRepositoryEntitlement => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLocalRepositoryEntitlement"')
      return LocalRepositoryEntitlement_possibleTypes.includes(obj.__typename)
    }
    


    const Maintenance_possibleTypes: string[] = ['Maintenance']
    export const isMaintenance = (obj?: { __typename?: any } | null): obj is Maintenance => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMaintenance"')
      return Maintenance_possibleTypes.includes(obj.__typename)
    }
    


    const NamespaceEntitlements_possibleTypes: string[] = ['NamespaceEntitlements']
    export const isNamespaceEntitlements = (obj?: { __typename?: any } | null): obj is NamespaceEntitlements => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNamespaceEntitlements"')
      return NamespaceEntitlements_possibleTypes.includes(obj.__typename)
    }
    


    const PlanRequirement_possibleTypes: string[] = ['PlanRequirement']
    export const isPlanRequirement = (obj?: { __typename?: any } | null): obj is PlanRequirement => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPlanRequirement"')
      return PlanRequirement_possibleTypes.includes(obj.__typename)
    }
    


    const ProductSubscription_possibleTypes: string[] = ['ProductSubscription']
    export const isProductSubscription = (obj?: { __typename?: any } | null): obj is ProductSubscription => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProductSubscription"')
      return ProductSubscription_possibleTypes.includes(obj.__typename)
    }
    


    const ProductSubscriptionPendingChange_possibleTypes: string[] = ['ProductSubscriptionPendingChange']
    export const isProductSubscriptionPendingChange = (obj?: { __typename?: any } | null): obj is ProductSubscriptionPendingChange => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProductSubscriptionPendingChange"')
      return ProductSubscriptionPendingChange_possibleTypes.includes(obj.__typename)
    }
    


    const ProductSubscriptionQuantity_possibleTypes: string[] = ['ProductSubscriptionQuantity']
    export const isProductSubscriptionQuantity = (obj?: { __typename?: any } | null): obj is ProductSubscriptionQuantity => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProductSubscriptionQuantity"')
      return ProductSubscriptionQuantity_possibleTypes.includes(obj.__typename)
    }
    


    const RemoteRepositoryEntitlement_possibleTypes: string[] = ['RemoteRepositoryEntitlement']
    export const isRemoteRepositoryEntitlement = (obj?: { __typename?: any } | null): obj is RemoteRepositoryEntitlement => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRemoteRepositoryEntitlement"')
      return RemoteRepositoryEntitlement_possibleTypes.includes(obj.__typename)
    }
    


    const RepositoryFeatureResult_possibleTypes: string[] = ['RepositoryFeatureResult']
    export const isRepositoryFeatureResult = (obj?: { __typename?: any } | null): obj is RepositoryFeatureResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRepositoryFeatureResult"')
      return RepositoryFeatureResult_possibleTypes.includes(obj.__typename)
    }
    


    const RepositoryFeatures_possibleTypes: string[] = ['RepositoryFeatures']
    export const isRepositoryFeatures = (obj?: { __typename?: any } | null): obj is RepositoryFeatures => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRepositoryFeatures"')
      return RepositoryFeatures_possibleTypes.includes(obj.__typename)
    }
    


    const RepositoryProperties_possibleTypes: string[] = ['RepositoryProperties']
    export const isRepositoryProperties = (obj?: { __typename?: any } | null): obj is RepositoryProperties => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRepositoryProperties"')
      return RepositoryProperties_possibleTypes.includes(obj.__typename)
    }
    


    const RepositoryResult_possibleTypes: string[] = ['RepositoryResult']
    export const isRepositoryResult = (obj?: { __typename?: any } | null): obj is RepositoryResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRepositoryResult"')
      return RepositoryResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScEntitlementsPlan_possibleTypes: string[] = ['ScEntitlementsPlan']
    export const isScEntitlementsPlan = (obj?: { __typename?: any } | null): obj is ScEntitlementsPlan => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScEntitlementsPlan"')
      return ScEntitlementsPlan_possibleTypes.includes(obj.__typename)
    }
    


    const ScoutAPIEntitlement_possibleTypes: string[] = ['ScoutAPIEntitlement']
    export const isScoutAPIEntitlement = (obj?: { __typename?: any } | null): obj is ScoutAPIEntitlement => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScoutAPIEntitlement"')
      return ScoutAPIEntitlement_possibleTypes.includes(obj.__typename)
    }
    


    const ScoutEnrollment_possibleTypes: string[] = ['ScoutEnrollment']
    export const isScoutEnrollment = (obj?: { __typename?: any } | null): obj is ScoutEnrollment => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScoutEnrollment"')
      return ScoutEnrollment_possibleTypes.includes(obj.__typename)
    }
    


    const ScoutEnrollmentFeatures_possibleTypes: string[] = ['ScoutEnrollmentFeatures']
    export const isScoutEnrollmentFeatures = (obj?: { __typename?: any } | null): obj is ScoutEnrollmentFeatures => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScoutEnrollmentFeatures"')
      return ScoutEnrollmentFeatures_possibleTypes.includes(obj.__typename)
    }
    


    const ScoutEnrollmentFeaturesRepo_possibleTypes: string[] = ['ScoutEnrollmentFeaturesRepo']
    export const isScoutEnrollmentFeaturesRepo = (obj?: { __typename?: any } | null): obj is ScoutEnrollmentFeaturesRepo => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScoutEnrollmentFeaturesRepo"')
      return ScoutEnrollmentFeaturesRepo_possibleTypes.includes(obj.__typename)
    }
    


    const ScoutEverywhereEntitlement_possibleTypes: string[] = ['ScoutEverywhereEntitlement']
    export const isScoutEverywhereEntitlement = (obj?: { __typename?: any } | null): obj is ScoutEverywhereEntitlement => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScoutEverywhereEntitlement"')
      return ScoutEverywhereEntitlement_possibleTypes.includes(obj.__typename)
    }
    


    const ServiceStatusResult_possibleTypes: string[] = ['ServiceStatusResult']
    export const isServiceStatusResult = (obj?: { __typename?: any } | null): obj is ServiceStatusResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isServiceStatusResult"')
      return ServiceStatusResult_possibleTypes.includes(obj.__typename)
    }
    


    const SetEnableReposOnPushResult_possibleTypes: string[] = ['SetEnableReposOnPushResult']
    export const isSetEnableReposOnPushResult = (obj?: { __typename?: any } | null): obj is SetEnableReposOnPushResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSetEnableReposOnPushResult"')
      return SetEnableReposOnPushResult_possibleTypes.includes(obj.__typename)
    }
    


    const ShouldEnableReposOnPushResult_possibleTypes: string[] = ['ShouldEnableReposOnPushResult']
    export const isShouldEnableReposOnPushResult = (obj?: { __typename?: any } | null): obj is ShouldEnableReposOnPushResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isShouldEnableReposOnPushResult"')
      return ShouldEnableReposOnPushResult_possibleTypes.includes(obj.__typename)
    }
    


    const Skill_possibleTypes: string[] = ['Skill']
    export const isSkill = (obj?: { __typename?: any } | null): obj is Skill => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSkill"')
      return Skill_possibleTypes.includes(obj.__typename)
    }
    


    const VulnerabilityReportingEntitlement_possibleTypes: string[] = ['VulnerabilityReportingEntitlement']
    export const isVulnerabilityReportingEntitlement = (obj?: { __typename?: any } | null): obj is VulnerabilityReportingEntitlement => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVulnerabilityReportingEntitlement"')
      return VulnerabilityReportingEntitlement_possibleTypes.includes(obj.__typename)
    }
    


    const VulnerabilityReportingRepoFeature_possibleTypes: string[] = ['VulnerabilityReportingRepoFeature']
    export const isVulnerabilityReportingRepoFeature = (obj?: { __typename?: any } | null): obj is VulnerabilityReportingRepoFeature => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVulnerabilityReportingRepoFeature"')
      return VulnerabilityReportingRepoFeature_possibleTypes.includes(obj.__typename)
    }
    


    const VulnerabilityReportingResult_possibleTypes: string[] = ['VulnerabilityReportingResult']
    export const isVulnerabilityReportingResult = (obj?: { __typename?: any } | null): obj is VulnerabilityReportingResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVulnerabilityReportingResult"')
      return VulnerabilityReportingResult_possibleTypes.includes(obj.__typename)
    }
    


    const MgAttestation_possibleTypes: string[] = ['MgAttestation']
    export const isMgAttestation = (obj?: { __typename?: any } | null): obj is MgAttestation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMgAttestation"')
      return MgAttestation_possibleTypes.includes(obj.__typename)
    }
    


    const MgAttestationBuildArg_possibleTypes: string[] = ['MgAttestationBuildArg']
    export const isMgAttestationBuildArg = (obj?: { __typename?: any } | null): obj is MgAttestationBuildArg => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMgAttestationBuildArg"')
      return MgAttestationBuildArg_possibleTypes.includes(obj.__typename)
    }
    


    const MgAttestationBuildParameters_possibleTypes: string[] = ['MgAttestationBuildParameters']
    export const isMgAttestationBuildParameters = (obj?: { __typename?: any } | null): obj is MgAttestationBuildParameters => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMgAttestationBuildParameters"')
      return MgAttestationBuildParameters_possibleTypes.includes(obj.__typename)
    }
    


    const MgAttestationDockerfile_possibleTypes: string[] = ['MgAttestationDockerfile']
    export const isMgAttestationDockerfile = (obj?: { __typename?: any } | null): obj is MgAttestationDockerfile => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMgAttestationDockerfile"')
      return MgAttestationDockerfile_possibleTypes.includes(obj.__typename)
    }
    


    const MgAttestationDockerfileSourceMap_possibleTypes: string[] = ['MgAttestationDockerfileSourceMap']
    export const isMgAttestationDockerfileSourceMap = (obj?: { __typename?: any } | null): obj is MgAttestationDockerfileSourceMap => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMgAttestationDockerfileSourceMap"')
      return MgAttestationDockerfileSourceMap_possibleTypes.includes(obj.__typename)
    }
    


    const MgAttestationOCIConfig_possibleTypes: string[] = ['MgAttestationOCIConfig']
    export const isMgAttestationOCIConfig = (obj?: { __typename?: any } | null): obj is MgAttestationOCIConfig => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMgAttestationOCIConfig"')
      return MgAttestationOCIConfig_possibleTypes.includes(obj.__typename)
    }
    


    const MgAttestationOCIConfigConfig_possibleTypes: string[] = ['MgAttestationOCIConfigConfig']
    export const isMgAttestationOCIConfigConfig = (obj?: { __typename?: any } | null): obj is MgAttestationOCIConfigConfig => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMgAttestationOCIConfigConfig"')
      return MgAttestationOCIConfigConfig_possibleTypes.includes(obj.__typename)
    }
    


    const MgAttestationOCIConfigConfigHealthcheck_possibleTypes: string[] = ['MgAttestationOCIConfigConfigHealthcheck']
    export const isMgAttestationOCIConfigConfigHealthcheck = (obj?: { __typename?: any } | null): obj is MgAttestationOCIConfigConfigHealthcheck => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMgAttestationOCIConfigConfigHealthcheck"')
      return MgAttestationOCIConfigConfigHealthcheck_possibleTypes.includes(obj.__typename)
    }
    


    const MgAttestationOCIConfigConfigLabel_possibleTypes: string[] = ['MgAttestationOCIConfigConfigLabel']
    export const isMgAttestationOCIConfigConfigLabel = (obj?: { __typename?: any } | null): obj is MgAttestationOCIConfigConfigLabel => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMgAttestationOCIConfigConfigLabel"')
      return MgAttestationOCIConfigConfigLabel_possibleTypes.includes(obj.__typename)
    }
    


    const MgAttestationsListResult_possibleTypes: string[] = ['MgAttestationsListResult']
    export const isMgAttestationsListResult = (obj?: { __typename?: any } | null): obj is MgAttestationsListResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMgAttestationsListResult"')
      return MgAttestationsListResult_possibleTypes.includes(obj.__typename)
    }
    


    const MgAttestationSource_possibleTypes: string[] = ['MgAttestationSource']
    export const isMgAttestationSource = (obj?: { __typename?: any } | null): obj is MgAttestationSource => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMgAttestationSource"')
      return MgAttestationSource_possibleTypes.includes(obj.__typename)
    }
    


    const MgAttestationsResult_possibleTypes: string[] = ['MgAttestationsResult']
    export const isMgAttestationsResult = (obj?: { __typename?: any } | null): obj is MgAttestationsResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMgAttestationsResult"')
      return MgAttestationsResult_possibleTypes.includes(obj.__typename)
    }
    


    const BasePurlFields_possibleTypes: string[] = ['PurlFields','VEXPackageScope']
    export const isBasePurlFields = (obj?: { __typename?: any } | null): obj is BasePurlFields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBasePurlFields"')
      return BasePurlFields_possibleTypes.includes(obj.__typename)
    }
    


    const DeleteWebhookResult_possibleTypes: string[] = ['DeleteWebhookResult']
    export const isDeleteWebhookResult = (obj?: { __typename?: any } | null): obj is DeleteWebhookResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDeleteWebhookResult"')
      return DeleteWebhookResult_possibleTypes.includes(obj.__typename)
    }
    


    const DhiDestinationRepository_possibleTypes: string[] = ['DhiDestinationRepository']
    export const isDhiDestinationRepository = (obj?: { __typename?: any } | null): obj is DhiDestinationRepository => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiDestinationRepository"')
      return DhiDestinationRepository_possibleTypes.includes(obj.__typename)
    }
    


    const DhiGetMirroredRepositoriesBySourceRepositoryResponse_possibleTypes: string[] = ['DhiGetMirroredRepositoriesBySourceRepositoryResponse']
    export const isDhiGetMirroredRepositoriesBySourceRepositoryResponse = (obj?: { __typename?: any } | null): obj is DhiGetMirroredRepositoriesBySourceRepositoryResponse => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiGetMirroredRepositoriesBySourceRepositoryResponse"')
      return DhiGetMirroredRepositoriesBySourceRepositoryResponse_possibleTypes.includes(obj.__typename)
    }
    


    const DhiGetMirroredRepositoryResponse_possibleTypes: string[] = ['DhiGetMirroredRepositoryResponse']
    export const isDhiGetMirroredRepositoryResponse = (obj?: { __typename?: any } | null): obj is DhiGetMirroredRepositoryResponse => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiGetMirroredRepositoryResponse"')
      return DhiGetMirroredRepositoryResponse_possibleTypes.includes(obj.__typename)
    }
    


    const DhiImageManifest_possibleTypes: string[] = ['DhiImageManifest']
    export const isDhiImageManifest = (obj?: { __typename?: any } | null): obj is DhiImageManifest => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiImageManifest"')
      return DhiImageManifest_possibleTypes.includes(obj.__typename)
    }
    


    const DhiImageTag_possibleTypes: string[] = ['DhiImageTag']
    export const isDhiImageTag = (obj?: { __typename?: any } | null): obj is DhiImageTag => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiImageTag"')
      return DhiImageTag_possibleTypes.includes(obj.__typename)
    }
    


    const DhiIndexImage_possibleTypes: string[] = ['DhiIndexImage']
    export const isDhiIndexImage = (obj?: { __typename?: any } | null): obj is DhiIndexImage => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiIndexImage"')
      return DhiIndexImage_possibleTypes.includes(obj.__typename)
    }
    


    const DhiListMirroredRepositoriesResponse_possibleTypes: string[] = ['DhiListMirroredRepositoriesResponse']
    export const isDhiListMirroredRepositoriesResponse = (obj?: { __typename?: any } | null): obj is DhiListMirroredRepositoriesResponse => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiListMirroredRepositoriesResponse"')
      return DhiListMirroredRepositoriesResponse_possibleTypes.includes(obj.__typename)
    }
    


    const DhiListMirroringLogsResult_possibleTypes: string[] = ['DhiListMirroringLogsResult']
    export const isDhiListMirroringLogsResult = (obj?: { __typename?: any } | null): obj is DhiListMirroringLogsResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiListMirroringLogsResult"')
      return DhiListMirroringLogsResult_possibleTypes.includes(obj.__typename)
    }
    


    const DhiMirroredRepository_possibleTypes: string[] = ['DhiMirroredRepository']
    export const isDhiMirroredRepository = (obj?: { __typename?: any } | null): obj is DhiMirroredRepository => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiMirroredRepository"')
      return DhiMirroredRepository_possibleTypes.includes(obj.__typename)
    }
    


    const DhiMirroringLog_possibleTypes: string[] = ['DhiMirroringLog']
    export const isDhiMirroringLog = (obj?: { __typename?: any } | null): obj is DhiMirroringLog => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiMirroringLog"')
      return DhiMirroringLog_possibleTypes.includes(obj.__typename)
    }
    


    const DhiRepositoriesResult_possibleTypes: string[] = ['DhiRepositoriesResult']
    export const isDhiRepositoriesResult = (obj?: { __typename?: any } | null): obj is DhiRepositoriesResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiRepositoriesResult"')
      return DhiRepositoriesResult_possibleTypes.includes(obj.__typename)
    }
    


    const DhiRepositoryCategory_possibleTypes: string[] = ['DhiRepositoryCategory']
    export const isDhiRepositoryCategory = (obj?: { __typename?: any } | null): obj is DhiRepositoryCategory => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiRepositoryCategory"')
      return DhiRepositoryCategory_possibleTypes.includes(obj.__typename)
    }
    


    const DhiRepositoryDetailsResult_possibleTypes: string[] = ['DhiRepositoryDetailsResult']
    export const isDhiRepositoryDetailsResult = (obj?: { __typename?: any } | null): obj is DhiRepositoryDetailsResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiRepositoryDetailsResult"')
      return DhiRepositoryDetailsResult_possibleTypes.includes(obj.__typename)
    }
    


    const DhiRepositorySummary_possibleTypes: string[] = ['DhiRepositorySummary']
    export const isDhiRepositorySummary = (obj?: { __typename?: any } | null): obj is DhiRepositorySummary => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiRepositorySummary"')
      return DhiRepositorySummary_possibleTypes.includes(obj.__typename)
    }
    


    const DhiSetMirroredRepositoryResponse_possibleTypes: string[] = ['DhiSetMirroredRepositoryResponse']
    export const isDhiSetMirroredRepositoryResponse = (obj?: { __typename?: any } | null): obj is DhiSetMirroredRepositoryResponse => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiSetMirroredRepositoryResponse"')
      return DhiSetMirroredRepositoryResponse_possibleTypes.includes(obj.__typename)
    }
    


    const DhiSourceRepository_possibleTypes: string[] = ['DhiSourceRepository']
    export const isDhiSourceRepository = (obj?: { __typename?: any } | null): obj is DhiSourceRepository => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiSourceRepository"')
      return DhiSourceRepository_possibleTypes.includes(obj.__typename)
    }
    


    const DhiTagDetailsResult_possibleTypes: string[] = ['DhiTagDetailsResult']
    export const isDhiTagDetailsResult = (obj?: { __typename?: any } | null): obj is DhiTagDetailsResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDhiTagDetailsResult"')
      return DhiTagDetailsResult_possibleTypes.includes(obj.__typename)
    }
    


    const ExceptionSource_possibleTypes: string[] = ['VEXStatement','ManualException']
    export const isExceptionSource = (obj?: { __typename?: any } | null): obj is ExceptionSource => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isExceptionSource"')
      return ExceptionSource_possibleTypes.includes(obj.__typename)
    }
    


    const ExceptionVulnerability_possibleTypes: string[] = ['ExceptionVulnerability']
    export const isExceptionVulnerability = (obj?: { __typename?: any } | null): obj is ExceptionVulnerability => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isExceptionVulnerability"')
      return ExceptionVulnerability_possibleTypes.includes(obj.__typename)
    }
    


    const ImageRepositoryResult_possibleTypes: string[] = ['ImageRepositoryResult']
    export const isImageRepositoryResult = (obj?: { __typename?: any } | null): obj is ImageRepositoryResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isImageRepositoryResult"')
      return ImageRepositoryResult_possibleTypes.includes(obj.__typename)
    }
    


    const ListWebhooksResult_possibleTypes: string[] = ['ListWebhooksResult']
    export const isListWebhooksResult = (obj?: { __typename?: any } | null): obj is ListWebhooksResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isListWebhooksResult"')
      return ListWebhooksResult_possibleTypes.includes(obj.__typename)
    }
    


    const ManualException_possibleTypes: string[] = ['ManualException']
    export const isManualException = (obj?: { __typename?: any } | null): obj is ManualException => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isManualException"')
      return ManualException_possibleTypes.includes(obj.__typename)
    }
    


    const MutationResponse_possibleTypes: string[] = ['MutationResponse']
    export const isMutationResponse = (obj?: { __typename?: any } | null): obj is MutationResponse => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMutationResponse"')
      return MutationResponse_possibleTypes.includes(obj.__typename)
    }
    


    const PkImagePlatform_possibleTypes: string[] = ['PkImagePlatform']
    export const isPkImagePlatform = (obj?: { __typename?: any } | null): obj is PkImagePlatform => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPkImagePlatform"')
      return PkImagePlatform_possibleTypes.includes(obj.__typename)
    }
    


    const PkImagesWithPackageResponse_possibleTypes: string[] = ['PkImagesWithPackageResponse']
    export const isPkImagesWithPackageResponse = (obj?: { __typename?: any } | null): obj is PkImagesWithPackageResponse => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPkImagesWithPackageResponse"')
      return PkImagesWithPackageResponse_possibleTypes.includes(obj.__typename)
    }
    


    const PkImageWithPackage_possibleTypes: string[] = ['PkImageWithPackage']
    export const isPkImageWithPackage = (obj?: { __typename?: any } | null): obj is PkImageWithPackage => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPkImageWithPackage"')
      return PkImageWithPackage_possibleTypes.includes(obj.__typename)
    }
    


    const PkRepository_possibleTypes: string[] = ['PkRepository']
    export const isPkRepository = (obj?: { __typename?: any } | null): obj is PkRepository => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPkRepository"')
      return PkRepository_possibleTypes.includes(obj.__typename)
    }
    


    const PurlFields_possibleTypes: string[] = ['PurlFields']
    export const isPurlFields = (obj?: { __typename?: any } | null): obj is PurlFields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPurlFields"')
      return PurlFields_possibleTypes.includes(obj.__typename)
    }
    


    const ScCVEPackageVulnerability_possibleTypes: string[] = ['ScCVEPackageVulnerability']
    export const isScCVEPackageVulnerability = (obj?: { __typename?: any } | null): obj is ScCVEPackageVulnerability => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScCVEPackageVulnerability"')
      return ScCVEPackageVulnerability_possibleTypes.includes(obj.__typename)
    }
    


    const ScCVEPackageVulnerabilityVersion_possibleTypes: string[] = ['ScCVEPackageVulnerabilityVersion']
    export const isScCVEPackageVulnerabilityVersion = (obj?: { __typename?: any } | null): obj is ScCVEPackageVulnerabilityVersion => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScCVEPackageVulnerabilityVersion"')
      return ScCVEPackageVulnerabilityVersion_possibleTypes.includes(obj.__typename)
    }
    


    const ScCVESource_possibleTypes: string[] = ['ScCVESource']
    export const isScCVESource = (obj?: { __typename?: any } | null): obj is ScCVESource => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScCVESource"')
      return ScCVESource_possibleTypes.includes(obj.__typename)
    }
    


    const ScCVESourcesResult_possibleTypes: string[] = ['ScCVESourcesResult']
    export const isScCVESourcesResult = (obj?: { __typename?: any } | null): obj is ScCVESourcesResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScCVESourcesResult"')
      return ScCVESourcesResult_possibleTypes.includes(obj.__typename)
    }
    


    const ScoutHealthScore_possibleTypes: string[] = ['ScoutHealthScore']
    export const isScoutHealthScore = (obj?: { __typename?: any } | null): obj is ScoutHealthScore => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScoutHealthScore"')
      return ScoutHealthScore_possibleTypes.includes(obj.__typename)
    }
    


    const ScoutHealthScorePolicy_possibleTypes: string[] = ['ScoutHealthScorePolicy']
    export const isScoutHealthScorePolicy = (obj?: { __typename?: any } | null): obj is ScoutHealthScorePolicy => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isScoutHealthScorePolicy"')
      return ScoutHealthScorePolicy_possibleTypes.includes(obj.__typename)
    }
    


    const StreamSummaryResult_possibleTypes: string[] = ['StreamSummaryResult']
    export const isStreamSummaryResult = (obj?: { __typename?: any } | null): obj is StreamSummaryResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isStreamSummaryResult"')
      return StreamSummaryResult_possibleTypes.includes(obj.__typename)
    }
    


    const TestWebhookResult_possibleTypes: string[] = ['TestWebhookResult']
    export const isTestWebhookResult = (obj?: { __typename?: any } | null): obj is TestWebhookResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTestWebhookResult"')
      return TestWebhookResult_possibleTypes.includes(obj.__typename)
    }
    


    const VEXDocument_possibleTypes: string[] = ['VEXDocument']
    export const isVEXDocument = (obj?: { __typename?: any } | null): obj is VEXDocument => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVEXDocument"')
      return VEXDocument_possibleTypes.includes(obj.__typename)
    }
    


    const VEXPackageScope_possibleTypes: string[] = ['VEXPackageScope']
    export const isVEXPackageScope = (obj?: { __typename?: any } | null): obj is VEXPackageScope => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVEXPackageScope"')
      return VEXPackageScope_possibleTypes.includes(obj.__typename)
    }
    


    const VEXStatement_possibleTypes: string[] = ['VEXStatement']
    export const isVEXStatement = (obj?: { __typename?: any } | null): obj is VEXStatement => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVEXStatement"')
      return VEXStatement_possibleTypes.includes(obj.__typename)
    }
    


    const VEXStatementImage_possibleTypes: string[] = ['VEXStatementImage']
    export const isVEXStatementImage = (obj?: { __typename?: any } | null): obj is VEXStatementImage => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVEXStatementImage"')
      return VEXStatementImage_possibleTypes.includes(obj.__typename)
    }
    


    const VEXStatementScope_possibleTypes: string[] = ['VEXStatementScope']
    export const isVEXStatementScope = (obj?: { __typename?: any } | null): obj is VEXStatementScope => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVEXStatementScope"')
      return VEXStatementScope_possibleTypes.includes(obj.__typename)
    }
    


    const VulnerabilitiesByPackageResponse_possibleTypes: string[] = ['VulnerabilitiesByPackageResponse']
    export const isVulnerabilitiesByPackageResponse = (obj?: { __typename?: any } | null): obj is VulnerabilitiesByPackageResponse => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVulnerabilitiesByPackageResponse"')
      return VulnerabilitiesByPackageResponse_possibleTypes.includes(obj.__typename)
    }
    


    const VulnerabilityException_possibleTypes: string[] = ['VulnerabilityException']
    export const isVulnerabilityException = (obj?: { __typename?: any } | null): obj is VulnerabilityException => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVulnerabilityException"')
      return VulnerabilityException_possibleTypes.includes(obj.__typename)
    }
    


    const VulnerabilityExceptionImageScope_possibleTypes: string[] = ['VulnerabilityExceptionImageScope']
    export const isVulnerabilityExceptionImageScope = (obj?: { __typename?: any } | null): obj is VulnerabilityExceptionImageScope => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVulnerabilityExceptionImageScope"')
      return VulnerabilityExceptionImageScope_possibleTypes.includes(obj.__typename)
    }
    


    const VulnerabilityExceptionPackageScope_possibleTypes: string[] = ['VulnerabilityExceptionPackageScope']
    export const isVulnerabilityExceptionPackageScope = (obj?: { __typename?: any } | null): obj is VulnerabilityExceptionPackageScope => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVulnerabilityExceptionPackageScope"')
      return VulnerabilityExceptionPackageScope_possibleTypes.includes(obj.__typename)
    }
    


    const VulnerabilityExceptionReason_possibleTypes: string[] = ['VulnerabilityExceptionReason']
    export const isVulnerabilityExceptionReason = (obj?: { __typename?: any } | null): obj is VulnerabilityExceptionReason => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVulnerabilityExceptionReason"')
      return VulnerabilityExceptionReason_possibleTypes.includes(obj.__typename)
    }
    


    const VulnerabilityExceptionsResult_possibleTypes: string[] = ['VulnerabilityExceptionsResult']
    export const isVulnerabilityExceptionsResult = (obj?: { __typename?: any } | null): obj is VulnerabilityExceptionsResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVulnerabilityExceptionsResult"')
      return VulnerabilityExceptionsResult_possibleTypes.includes(obj.__typename)
    }
    


    const Webhook_possibleTypes: string[] = ['Webhook']
    export const isWebhook = (obj?: { __typename?: any } | null): obj is Webhook => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWebhook"')
      return Webhook_possibleTypes.includes(obj.__typename)
    }
    


    const CVEVulnerabilityState_possibleTypes: string[] = ['CVEVulnerabilityState']
    export const isCVEVulnerabilityState = (obj?: { __typename?: any } | null): obj is CVEVulnerabilityState => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCVEVulnerabilityState"')
      return CVEVulnerabilityState_possibleTypes.includes(obj.__typename)
    }
    


    const FeedNotification_possibleTypes: string[] = ['NotificationNewCVE','NotificationUpdateCVE']
    export const isFeedNotification = (obj?: { __typename?: any } | null): obj is FeedNotification => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFeedNotification"')
      return FeedNotification_possibleTypes.includes(obj.__typename)
    }
    


    const GenericWebhook_possibleTypes: string[] = ['GenericWebhook']
    export const isGenericWebhook = (obj?: { __typename?: any } | null): obj is GenericWebhook => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isGenericWebhook"')
      return GenericWebhook_possibleTypes.includes(obj.__typename)
    }
    


    const ImageReference_possibleTypes: string[] = ['ImageReference']
    export const isImageReference = (obj?: { __typename?: any } | null): obj is ImageReference => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isImageReference"')
      return ImageReference_possibleTypes.includes(obj.__typename)
    }
    


    const Notification_possibleTypes: string[] = ['Notification']
    export const isNotification = (obj?: { __typename?: any } | null): obj is Notification => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNotification"')
      return Notification_possibleTypes.includes(obj.__typename)
    }
    


    const NotificationNewCVE_possibleTypes: string[] = ['NotificationNewCVE']
    export const isNotificationNewCVE = (obj?: { __typename?: any } | null): obj is NotificationNewCVE => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNotificationNewCVE"')
      return NotificationNewCVE_possibleTypes.includes(obj.__typename)
    }
    


    const NotificationUpdateCVE_possibleTypes: string[] = ['NotificationUpdateCVE']
    export const isNotificationUpdateCVE = (obj?: { __typename?: any } | null): obj is NotificationUpdateCVE => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNotificationUpdateCVE"')
      return NotificationUpdateCVE_possibleTypes.includes(obj.__typename)
    }
    


    const NotificationWebhookAuthor_possibleTypes: string[] = ['NotificationWebhookAuthor']
    export const isNotificationWebhookAuthor = (obj?: { __typename?: any } | null): obj is NotificationWebhookAuthor => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNotificationWebhookAuthor"')
      return NotificationWebhookAuthor_possibleTypes.includes(obj.__typename)
    }
    


    const NotificationWebhookResult_possibleTypes: string[] = ['GenericWebhook','SlackWebhook']
    export const isNotificationWebhookResult = (obj?: { __typename?: any } | null): obj is NotificationWebhookResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNotificationWebhookResult"')
      return NotificationWebhookResult_possibleTypes.includes(obj.__typename)
    }
    


    const Repository_possibleTypes: string[] = ['Repository']
    export const isRepository = (obj?: { __typename?: any } | null): obj is Repository => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRepository"')
      return Repository_possibleTypes.includes(obj.__typename)
    }
    


    const SlackWebhook_possibleTypes: string[] = ['SlackWebhook']
    export const isSlackWebhook = (obj?: { __typename?: any } | null): obj is SlackWebhook => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSlackWebhook"')
      return SlackWebhook_possibleTypes.includes(obj.__typename)
    }
    


    const UserNotificationPreferencesResult_possibleTypes: string[] = ['UserNotificationPreferencesResult']
    export const isUserNotificationPreferencesResult = (obj?: { __typename?: any } | null): obj is UserNotificationPreferencesResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserNotificationPreferencesResult"')
      return UserNotificationPreferencesResult_possibleTypes.includes(obj.__typename)
    }
    


    const WeeklyReportSettings_possibleTypes: string[] = ['WeeklyReportSettings']
    export const isWeeklyReportSettings = (obj?: { __typename?: any } | null): obj is WeeklyReportSettings => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWeeklyReportSettings"')
      return WeeklyReportSettings_possibleTypes.includes(obj.__typename)
    }
    


    const rsAcrResult_possibleTypes: string[] = ['rsAcrResult']
    export const isrsAcrResult = (obj?: { __typename?: any } | null): obj is rsAcrResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isrsAcrResult"')
      return rsAcrResult_possibleTypes.includes(obj.__typename)
    }
    


    const rsDockerHubResult_possibleTypes: string[] = ['rsDockerHubResult']
    export const isrsDockerHubResult = (obj?: { __typename?: any } | null): obj is rsDockerHubResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isrsDockerHubResult"')
      return rsDockerHubResult_possibleTypes.includes(obj.__typename)
    }
    


    const rsEcrResult_possibleTypes: string[] = ['rsEcrResult']
    export const isrsEcrResult = (obj?: { __typename?: any } | null): obj is rsEcrResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isrsEcrResult"')
      return rsEcrResult_possibleTypes.includes(obj.__typename)
    }
    


    const rsPageInfo_possibleTypes: string[] = ['rsPageInfo']
    export const isrsPageInfo = (obj?: { __typename?: any } | null): obj is rsPageInfo => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isrsPageInfo"')
      return rsPageInfo_possibleTypes.includes(obj.__typename)
    }
    


    const rsRegistryResult_possibleTypes: string[] = ['rsAcrResult','rsDockerHubResult','rsEcrResult']
    export const isrsRegistryResult = (obj?: { __typename?: any } | null): obj is rsRegistryResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isrsRegistryResult"')
      return rsRegistryResult_possibleTypes.includes(obj.__typename)
    }
    


    const rsRepository_possibleTypes: string[] = ['rsRepository']
    export const isrsRepository = (obj?: { __typename?: any } | null): obj is rsRepository => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isrsRepository"')
      return rsRepository_possibleTypes.includes(obj.__typename)
    }
    


    const rsRepositoryListResult_possibleTypes: string[] = ['rsRepositoryListResult']
    export const isrsRepositoryListResult = (obj?: { __typename?: any } | null): obj is rsRepositoryListResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isrsRepositoryListResult"')
      return rsRepositoryListResult_possibleTypes.includes(obj.__typename)
    }
    


    const rsRepositoryProperties_possibleTypes: string[] = ['rsRepositoryProperties']
    export const isrsRepositoryProperties = (obj?: { __typename?: any } | null): obj is rsRepositoryProperties => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isrsRepositoryProperties"')
      return rsRepositoryProperties_possibleTypes.includes(obj.__typename)
    }
    


    const rsSkill_possibleTypes: string[] = ['rsSkill']
    export const isrsSkill = (obj?: { __typename?: any } | null): obj is rsSkill => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isrsSkill"')
      return rsSkill_possibleTypes.includes(obj.__typename)
    }
    

export const enumAddImageToStreamStatus = {
   ACCEPTED: 'ACCEPTED' as const
}

export const enumCvssSeverity = {
   CRITICAL: 'CRITICAL' as const,
   HIGH: 'HIGH' as const,
   MEDIUM: 'MEDIUM' as const,
   LOW: 'LOW' as const,
   UNSPECIFIED: 'UNSPECIFIED' as const
}

export const enumCvssVersion = {
   CVSS_VERSION_2: 'CVSS_VERSION_2' as const,
   CVSS_VERSION_3: 'CVSS_VERSION_3' as const,
   CVSS_VERSION_4: 'CVSS_VERSION_4' as const
}

export const enumDetectedSecretSourceType = {
   FILE: 'FILE' as const,
   ENV: 'ENV' as const,
   LABEL: 'LABEL' as const,
   HISTORY: 'HISTORY' as const
}

export const enumDockerRole = {
   editor: 'editor' as const,
   owner: 'owner' as const,
   member: 'member' as const,
   user: 'user' as const
}

export const enumEpssPriorityCategory = {
   LOWEST: 'LOWEST' as const,
   STANDARD: 'STANDARD' as const,
   HIGH: 'HIGH' as const,
   CRITICAL: 'CRITICAL' as const
}

export const enumExceptionType = {
   ACCEPTED_RISK: 'ACCEPTED_RISK' as const,
   FALSE_POSITIVE: 'FALSE_POSITIVE' as const
}

export const enumIbBuildKitProvenanceMode = {
   MIN: 'MIN' as const,
   MAX: 'MAX' as const
}

export const enumIbGitRefType = {
   BRANCH: 'BRANCH' as const,
   TAG: 'TAG' as const
}

export const enumIbImageRepositoryBadge = {
   OFFICIAL_IMAGE: 'OFFICIAL_IMAGE' as const,
   OPEN_SOURCE: 'OPEN_SOURCE' as const,
   VERIFIED_PUBLISHER: 'VERIFIED_PUBLISHER' as const
}

export const enumMatchedSecretSeverity = {
   LOW: 'LOW' as const,
   MEDIUM: 'MEDIUM' as const,
   HIGH: 'HIGH' as const,
   CRITICAL: 'CRITICAL' as const
}

export const enumPkVulnerabilityExceptionSourceType = {
   VEX_STATEMENT: 'VEX_STATEMENT' as const,
   MANUAL_EXCEPTION: 'MANUAL_EXCEPTION' as const
}

export const enumSbomState = {
   INDEXED: 'INDEXED' as const,
   INDEXING: 'INDEXING' as const,
   INDEXING_FAILED: 'INDEXING_FAILED' as const,
   INDEXING_UNAVAILABLE: 'INDEXING_UNAVAILABLE' as const,
   NONE: 'NONE' as const
}

export const enumScGroupedPackagesOrderingField = {
   VERSIONS_USED: 'VERSIONS_USED' as const,
   USED_BY: 'USED_BY' as const,
   NAME: 'NAME' as const,
   TYPE: 'TYPE' as const
}

export const enumScImagesAffectedByCveOrderingField = {
   LAST_PUSHED: 'LAST_PUSHED' as const,
   REPO_NAME: 'REPO_NAME' as const
}

export const enumScPolicyDeltaReason = {
   external: 'external' as const,
   image: 'image' as const
}

export const enumScPolicyOwner = {
   DOCKER: 'DOCKER' as const,
   USER: 'USER' as const
}

export const enumScPolicyState = {
   compliant: 'compliant' as const,
   noncompliant: 'noncompliant' as const,
   unknown: 'unknown' as const
}

export const enumScRemediationState = {
   PROPOSED: 'PROPOSED' as const,
   ACCEPTED: 'ACCEPTED' as const,
   APPLIED: 'APPLIED' as const,
   DISCARDED: 'DISCARDED' as const
}

export const enumScStreamBaseImagesSummaryOrderingField = {
   BASE_IMAGES_COUNT: 'BASE_IMAGES_COUNT' as const,
   CHILD_IMAGES_COUNT: 'CHILD_IMAGES_COUNT' as const,
   REPO_NAME: 'REPO_NAME' as const
}

export const enumScStreamCvEsOrderingField = {
   SEVERITY: 'SEVERITY' as const,
   DETECTED_IN_COUNT: 'DETECTED_IN_COUNT' as const,
   CVSS_SCORE: 'CVSS_SCORE' as const
}

export const enumScStreamImagesByBaseImageOrderingField = {
   LAST_PUSHED: 'LAST_PUSHED' as const,
   REPO_NAME: 'REPO_NAME' as const
}

export const enumScStreamImagesOrderingField = {
   LAST_PUSHED: 'LAST_PUSHED' as const,
   TAG_UPDATED_AT: 'TAG_UPDATED_AT' as const
}

export const enumScTaggedImagesOrderingField = {
   LAST_PUSHED: 'LAST_PUSHED' as const,
   TAG_NAME: 'TAG_NAME' as const
}

export const enumScVexStatementJustification = {
   COMPONENT_NOT_PRESENT: 'COMPONENT_NOT_PRESENT' as const,
   VULNERABLE_CODE_NOT_PRESENT: 'VULNERABLE_CODE_NOT_PRESENT' as const,
   VULNERABLE_CODE_NOT_IN_EXECUTE_PATH: 'VULNERABLE_CODE_NOT_IN_EXECUTE_PATH' as const,
   VULNERABLE_CODE_CANNOT_BE_CONTROLLED_BY_ADVERSARY: 'VULNERABLE_CODE_CANNOT_BE_CONTROLLED_BY_ADVERSARY' as const,
   INLINE_MITIGATIONS_ALREADY_EXIST: 'INLINE_MITIGATIONS_ALREADY_EXIST' as const
}

export const enumScVexStatementStatus = {
   NOT_AFFECTED: 'NOT_AFFECTED' as const,
   AFFECTED: 'AFFECTED' as const,
   FIXED: 'FIXED' as const,
   UNDER_INVESTIGATION: 'UNDER_INVESTIGATION' as const
}

export const enumScVulnerabilityExceptionType = {
   ACCEPTED_RISK: 'ACCEPTED_RISK' as const,
   FALSE_POSITIVE: 'FALSE_POSITIVE' as const
}

export const enumSetStreamImagesStatus = {
   ACCEPTED: 'ACCEPTED' as const
}

export const enumSortOrder = {
   ASCENDING: 'ASCENDING' as const,
   DESCENDING: 'DESCENDING' as const
}

export const enumStrVulnerabilityReportsQueryTimescale = {
   DAYS_7: 'DAYS_7' as const,
   DAYS_14: 'DAYS_14' as const,
   DAYS_30: 'DAYS_30' as const,
   DAYS_90: 'DAYS_90' as const,
   DAYS_180: 'DAYS_180' as const,
   DAYS_365: 'DAYS_365' as const
}

export const enumStrVulnerabilityReportsSummaryType = {
   CUMULATIVE: 'CUMULATIVE' as const,
   UNIQUE: 'UNIQUE' as const
}

export const enumVexStatementJustification = {
   COMPONENT_NOT_PRESENT: 'COMPONENT_NOT_PRESENT' as const,
   VULNERABLE_CODE_NOT_PRESENT: 'VULNERABLE_CODE_NOT_PRESENT' as const,
   VULNERABLE_CODE_NOT_IN_EXECUTE_PATH: 'VULNERABLE_CODE_NOT_IN_EXECUTE_PATH' as const,
   VULNERABLE_CODE_CANNOT_BE_CONTROLLED_BY_ADVERSARY: 'VULNERABLE_CODE_CANNOT_BE_CONTROLLED_BY_ADVERSARY' as const,
   INLINE_MITIGATIONS_ALREADY_EXIST: 'INLINE_MITIGATIONS_ALREADY_EXIST' as const
}

export const enumVexStatementStatus = {
   NOT_AFFECTED: 'NOT_AFFECTED' as const,
   AFFECTED: 'AFFECTED' as const,
   FIXED: 'FIXED' as const,
   UNDER_INVESTIGATION: 'UNDER_INVESTIGATION' as const
}

export const enumBillingCycle = {
   annual: 'annual' as const,
   monthly: 'monthly' as const
}

export const enumBillingOrigin = {
   inside_sales: 'inside_sales' as const,
   self_serve: 'self_serve' as const,
   unknown: 'unknown' as const
}

export const enumMaintenanceSeverity = {
   info: 'info' as const,
   warning: 'warning' as const,
   error: 'error' as const
}

export const enumProductPlan = {
   SCOUT_0: 'SCOUT_0' as const,
   SCOUT_1: 'SCOUT_1' as const,
   SCOUT_2: 'SCOUT_2' as const
}

export const enumProductSubscriptionPendingChangeType = {
   quantity_decrease: 'quantity_decrease' as const,
   quantity_increase: 'quantity_increase' as const,
   tier_change: 'tier_change' as const,
   cycle_change: 'cycle_change' as const
}

export const enumProductSubscriptionStatus = {
   active: 'active' as const,
   inactive: 'inactive' as const,
   past_due: 'past_due' as const
}

export const enumProductTier = {
   free: 'free' as const,
   freeteam: 'freeteam' as const,
   team: 'team' as const,
   business: 'business' as const,
   dsos: 'dsos' as const,
   pro: 'pro' as const,
   captain: 'captain' as const
}

export const enumRepositoryType = {
   standard: 'standard' as const,
   dhi_mirror: 'dhi_mirror' as const
}

export const enumDhiMirroringLogReason = {
   ONBOARDING: 'ONBOARDING' as const,
   PUSH: 'PUSH' as const
}

export const enumDhiMirroringLogStatus = {
   REQUESTED: 'REQUESTED' as const,
   STARTED: 'STARTED' as const,
   FAILED: 'FAILED' as const,
   SUCCEEDED: 'SUCCEEDED' as const
}

export const enumImagesWithPackageOrderingField = {
   LAST_PUSHED: 'LAST_PUSHED' as const,
   NAME: 'NAME' as const
}

export const enumMutationResponseStatus = {
   ACCEPTED: 'ACCEPTED' as const,
   BAD_REQUEST: 'BAD_REQUEST' as const,
   ERROR: 'ERROR' as const,
   NOT_FOUND: 'NOT_FOUND' as const
}

export const enumScoutHealthScorePolicyStatus = {
   PASS: 'PASS' as const,
   FAIL: 'FAIL' as const,
   UNKNOWN: 'UNKNOWN' as const
}

export const enumSourceType = {
   VEX: 'VEX' as const,
   SCOUT: 'SCOUT' as const
}

export const enumStreamSummaryMode = {
   CUMULATIVE_BY_PURL: 'CUMULATIVE_BY_PURL' as const,
   UNIQUE_BY_PURL: 'UNIQUE_BY_PURL' as const,
   UNIQUE_BY_CVE: 'UNIQUE_BY_CVE' as const
}

export const enumWebhookEvent = {
   EVERYTHING: 'EVERYTHING' as const,
   DHI_MIRROR_COMPLETED: 'DHI_MIRROR_COMPLETED' as const
}

export const enumRepositoryFilterType = {
   ALLOW: 'ALLOW' as const,
   BLOCK: 'BLOCK' as const
}

export const enumWebhookType = {
   GENERIC: 'GENERIC' as const,
   SLACK: 'SLACK' as const
}

export const enumRsRegistryStatus = {
   CONNECTED: 'CONNECTED' as const,
   PENDING: 'PENDING' as const,
   FAILED: 'FAILED' as const
}

export const enumRsRepositoryListSortField = {
   NAME: 'NAME' as const,
   CREATED_AT: 'CREATED_AT' as const,
   UPDATED_AT: 'UPDATED_AT' as const,
   EMPTY: 'EMPTY' as const,
   ENABLED: 'ENABLED' as const
}

export const enumRsRepositoryType = {
   STANDARD: 'STANDARD' as const,
   DHI_MIRROR: 'DHI_MIRROR' as const
}
